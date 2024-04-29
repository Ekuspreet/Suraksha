const { exec } = require('child_process');


function sendSMS(number, message) {

    exec(`termux-sms-send -n ${number} "${message}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).send('SMS Sent');
            }
            if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).send('SMS failed to Sent');
        }
        console.log(`Output: ${stdout}`);
        res.send('Command executed successfully');
    });

}