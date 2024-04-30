const mongoose = require('mongoose');

// Define a schema for the MongoDB collection
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  EmergencyNumbers: [{
    type: String
  }],
  SOSMessage: {
    type: String,
    default : " "
  }
});

// Create a model from the schema
const user = mongoose.model('user', userSchema);

module.exports = user;
