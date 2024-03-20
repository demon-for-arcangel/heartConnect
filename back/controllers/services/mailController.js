const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

const sendMail = (mailOptions) =>{
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
            res.status(203).json({'msg' : 'Correo NO enviado'})
        } else {
            console.log('Correo electrónico enviado exitosamente:', info.response);
            res.status(200).json({'msg' : 'Correo enviado'})
        }
    });
}

const sendContactMail = (req, res) => {
    
    let mailOptions = {
        from: req.body.to, 
        to: process.env.MAIL_USER, 
        subject: `${req.body.name} ha enviado un formulario de contacto`, 
        text: req.body.message
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
            res.status(203).json({'msg' : 'Correo NO enviado'})
        } else {
            console.log('Correo electrónico enviado exitosamente:', info.response);
            res.status(200).json({'msg' : 'Correo enviado'})
        }
    });
}

module.exports = {
    sendContactMail,
    sendMail
}