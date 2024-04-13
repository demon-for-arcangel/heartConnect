const nodemailer = require('nodemailer');
const { generarJWT, verifyToken } = require("../../helpers/jwt");
const bcrypt = require('bcrypt');
const { User } = require('../../models');

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

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado'});
        }
        
        const resetToken = generarJWT(user.id, ['resetPassword']);

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Restablecer Contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: \n\n http://localhost:3000/reset/${resetToken}\n\n Si no solicitaste este restablecimiento, por favor ignora este correo.`
        };

        sendMail(mailOptions, res); 
        res.status(200).json({ msg: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}
const resetPassword = async (req, res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    const { newPassword } = req.body;

    try{
        const decoded = verifyToken(token);

        const hashedPassword = await bcrypt.hash(newPassword);

        user.password = hashedPassword;
        await user.save()

        revokeToken(token);
        res.status(200).json({ msg: 'Contraseña restablecida con éxito' });
    }catch(error){
        console.log('Error al restablecer la contraseña: ', error.message);
        res.status(400).json({ msg: 'Error al restablecer la contraseña' });
    }
}

module.exports = {
    requestPasswordReset,
    resetPassword
}