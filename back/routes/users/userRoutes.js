const {Router } = require('express');
const controlador = require('../../controllers/users/userController');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const { register, login, logout } = require('../../controllers/users/authController');
const router = Router();

router.post('/register/', [check('firstName', 'El nombre es obligatorio').notEmpty(), check('lastName', 'Los apellido son obligatorios').notEmpty(),
check('email', 'El email es obligatorio').notEmpty(),
check('email', 'No es un email válido').isEmail(), validateFilds], register);
router.post('/login/', statusUser, login );
router.post('/logout', logout);

router.get('/users/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
router.get('/user/:id', controlador.getUserById);
router.post('/user', controlador.getUserByEmail);

router.post('/user/new-user', [
    /* checkToken,
    tokenCanAdmin, */
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'Los apellido son obligatorios').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'No es un email válido').isEmail(),
    validateFilds
], controlador.registerUserByAdmin );

router.put('/user/', /* [checkToken, tokenCanAdmin], */controlador.updateUser );
router.delete('/user/:id', /* [checkToken, tokenCanAdmin], */controlador.deleteUser );
/* router.get('/user/:id', /* [checkToken, tokenCanAdmin],   controlador.showUser );
 */

/* 
router.get('/my-profile', [checkToken, tokenCanUserAuth], controlador.showUser );
router.put('/forget-pass/', [checkToken, tokenCanAdmin],controlador.forgetPass);
router.post('/search', [checkToken, tokenCanAdmin], controlador.getUserByValue);
*/

module.exports = router;