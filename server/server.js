const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./userModel.js');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { sendSMS } = require('./sendsms.js');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.CONNECTION_URI_STRING;

app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define function scope for otpStorage
function createOtpStorage() {
    const otpStorage = {};

    // Endpoint to generate and send OTP to the provided phone number
    app.post('/generate-otp', async (req, res) => {
        try {
            const { phoneNumber } = req.body;

            // Generate OTP
            const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

            // Save OTP temporarily with expiration time (e.g., 5 minutes from now)
            otpStorage[phoneNumber] = {
                otp: otp,
                expiration: Date.now() + 5 * 60 * 1000 // 5 minutes expiration
            };

            try {
                const response = await sendSMS(phoneNumber, otp);
                console.log('Message sent successfully:', response);
            } catch (error) {
                console.error('Error sending message:', error);
            }

            res.status(200).json({ message: 'OTP generated and sent successfully' });
        } catch (err) {
            console.error('Error generating OTP:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Endpoint to verify OTP and add user to MongoDB
    app.post('/validate-otp', async (req, res) => {
        try {
            const { phoneNumber, otp, name } = req.body;

            // Verify OTP
            if (!otpStorage[phoneNumber]) {
                return res.status(400).json({ error: 'Resend OTP' });
            }
            if (otpStorage[phoneNumber].otp !== otp) {
                return res.status(400).json({ error: 'Invalid OTP' });
            }
            // Check if OTP is expired
            if (otpStorage[phoneNumber].expiration < Date.now()) {
                delete otpStorage[phoneNumber]; // Remove expired OTP
                return res.status(400).json({ error: 'OTP expired, please resend' });
            }

            // OTP verified, remove OTP from temporary storage
            delete otpStorage[phoneNumber];

            // Add user to MongoDB
            const newUser = new Contact({
                Name: name,
                PhoneNumber: phoneNumber,
            });

            await newUser.save();

            // Generate JWT token for the user
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

            // Respond with token and user details
            res.status(201).json({
                message: 'User created successfully',
                user: newUser,
                token: token // Send the token back to the client
            });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Endpoint for user login with phone number and OTP
    app.post('/login', async (req, res) => {
        try {
            const { phoneNumber, otp } = req.body;
            console.log(req.body)
            console.log(otpStorage)
            // Check if OTP exists in storage for the given phone number
            if (!otpStorage[phoneNumber].otp) {
                return res.status(400).json({ error: 'Resend OTP' });
            }

            // Verify OTP
            if (otpStorage[phoneNumber].otp !== otp) {
                return res.status(400).json({ error: 'Invalid OTP' });
            }

            // Check if OTP is expired
            if (otpStorage[phoneNumber].expiration < Date.now()) {
                delete otpStorage[phoneNumber]; // Remove expired OTP
                return res.status(400).json({ error: 'OTP expired, please resend' });
            }

            // OTP verified, check if user exists in the database based on the phone number
            const existingUser = await Contact.findOne({ PhoneNumber: phoneNumber });
            console.log(existingUser)
            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Generate JWT token for the user
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

            // Respond with token and user details
            res.status(200).json({
                message: 'Login successful',
                user: existingUser,
                token: token // Send the token back to the client
            });
        } catch (err) {
            console.error('Error logging in user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return otpStorage;
}

// Invoke the function to create otpStorage
const otpStorage = createOtpStorage();

// Endpoint to retrieve user details using JWT token
app.post('/dashboard', async (req, res) => {
    try {
        const token = req.body.token; // Extract the JWT token from the request body
        console.log(token)
        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with user details
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error retrieving user details:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update SOS message for a user using JWT token
app.post('/update-sos-message', async (req, res) => {
    try {
        const { token, content } = req.body;

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the SOSMessage field for the user
        user.SOSMessage = content;
        await user.save();

        // Respond with success message
        res.status(200).json({ message: 'SOS message updated successfully' });
    } catch (err) {
        console.error('Error updating SOS message:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to display emergency contact for a user using JWT token
app.post('/emergency-contact', async (req, res) => {
    try {
        const { token } = req.body;

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with emergency contact details
        res.status(200).json({ emergencyContact: user.EmergencyContacts });
    } catch (err) {
        console.error('Error retrieving emergency contact:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a contact for a user using JWT token
app.post('/add-contact', async (req, res) => {
    try {
        const { token, contact } = req.body;

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(contact)
        // Create a new array of emergency contacts with the added contact
        const updatedEmergencyContacts = [...user.EmergencyNumbers, contact.phone];
        
        // Update the user's emergency contacts
        user.EmergencyNumbers = updatedEmergencyContacts;
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'Contact added successfully' });
    } catch (err) {
        console.error('Error adding contact:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to delete a contact for a user using JWT token
app.post('/delete-contact', async (req, res) => {
    try {
        const { token, phoneNumber } = req.body;

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the contact to be deleted
        const index = user.EmergencyContacts.findIndex(contact => contact.phone === phoneNumber);
        if (index === -1) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Remove the contact from user's emergency contacts
        user.EmergencyContacts.splice(index, 1);
        await user.save();

        // Respond with success message
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Endpoint to send SOS message to all emergency contacts
app.post('/sos', async (req, res) => {
    try {
        const { token, latitude, longitude } = req.body;

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user in the database based on the user ID
        const user = await Contact.findById(userId).populate('EmergencyNumbers');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract SOS message from user's data
        const sosMessage = user.SOSMessage;

        // Prepare SOS message with latitude and longitude
        const sosWithLocation = `${sosMessage} Location: ${latitude}, ${longitude}`;

        // Send SOS message to all emergency contacts
        for (const contact of user.EmergencyNumbers) {
            try {
                // Send SOS message to the contact (assuming a function named sendMessage)
                await sendSMS(contact.phone, sosWithLocation); // Adjust this based on your messaging service
            } catch (error) {
                console.error('Error sending SOS message to contact:', error);
            }
        }

        res.status(200).json({ message: 'SOS message sent to all emergency contacts' });
    } catch (err) {
        console.error('Error sending SOS message:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
