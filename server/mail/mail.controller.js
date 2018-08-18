const nodemailer = require('nodemailer');



function replyMail(req, res,next) {
    const { username = 'latech', message = '' } = req.body 
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'karimationpingo@gmail.com', // generated ethereal user
                pass: 'Selmi11895480' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Report Bug 👻" <karimationpingo@gmail.com>', // sender address
            to: 'selmi.kerim@gmail.com', // list of receivers
            subject: 'Report Bug from ' + username, // Subject line
            text: 'Hello world', // plain text body
            html: '<b>' + message + '</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.send({status:'success','info':info.messageId})
        });
    });
}

module.exports = { replyMail }
