const {Router } = require('express');
const controlador = require('../../controllers/users/userController');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const { register, login } = require('../../controllers/users/authController');
const router = Router();

router.post('/register/', register);
router.post('/login/', statusUser ,login );
/* router.get('/user/:id', [checkToken, tokenCanAdmin] ,controlador.showUser );

router.get('/my-profile', [checkToken, tokenCanUserAuth], controlador.showUser );

router.delete('/user/:id', controlador.deleteUser );

router.post('/user/', [
    checkToken,
    tokenCanAdmin,
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'Los apellido son obligatorios').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'No es un email válido').isEmail(),
    validateFilds
],controlador.newUser );


router.put('/user/', [checkToken, tokenCanAdmin],controlador.updateUser );
router.get('/users/', [checkToken, tokenCanAdmin], controlador.index);
router.put('/forget-pass/', [checkToken, tokenCanAdmin],controlador.forgetPass);
router.post('/search', [checkToken, tokenCanAdmin], controlador.getUserByValue);

//obtener los socios asociados a un tutor
router.get('/socios/:idTutor',[checkToken, tokenCanTutor], controlador.showSociosOfTutor);

router.get('/socios',[checkToken, tokenCanTutor], controlador.showSocios);

//obtener de un socio los tutores asociados
router.get('/tutor/:idSocio',[checkToken, tokenCanSocio], controlador.showTutorsOfSocio);

router.post('/user/asign',[checkToken, tokenCanAdmin, checkDiferenceAsign], controlador.asignUser)

router.get('/rols',[checkToken, tokenCanAdmin], controlador.showRols) */

module.exports = router;