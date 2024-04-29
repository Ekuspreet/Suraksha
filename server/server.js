require('dotenv').config(); // for loading enviornment variables.

const express = require('express'); //the main express server thingy.
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors()); // for cross origin
app.use(express.json()); //for res.json (if im not wrong)
app.use(cookieParser()); //to parse cookies. usage: req.cookies.COOKIE_NAME

const { attachDatabasePool } = require('./db.js');
app.use(attachDatabasePool); //usage example: await req.db.query('SELECT 1');

// module to check for missing fields, providing it with an array.
const {attachCheckFields} = require('./modules/checkfields.js');
app.use(attachCheckFields);
/**
 * Usage:
 * const requiredFields = ['field1', 'field2', 'etc'];
 * const fields = req.checkFields(requiredFields);
 * Response upon missing:
 * {
 *   status: false,
 *   message: 'Missing fields: batch, aadhar_number, college'
 * }
**/

app.listen(process.env.BUSPASS_SERVER_MOBILE_API_PORT, async () => {
    console.log(`Server is running on port ${process.env.BUSPASS_SERVER_MOBILE_API_PORT}.`);
    const {getDatabasePool} = require('./db.js');
    const db = await getDatabasePool();
    
});