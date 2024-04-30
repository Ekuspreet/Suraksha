// smsApi.js
require("dotenv").config();
const apiKey = process.env.HTTPSMS_API_KEY;

async function sendSMS( receiver, content) {
    const response = await fetch('https://api.httpsms.com/v1/messages/send', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": content,
            "from": "+918146436784", // Assuming this is the sender
            "to": receiver
        })
    });

    return response.json();
}

module.exports = { sendSMS };
