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
router.get('/users/active', controlador.getActiveUsers);
router.get('/users/inactive', controlador.getInactiveUsers);

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
router.put('/users/activate', /* [checkToken, tokenCanAdmin], */controlador.activateUser);
router.put('/users/desactivate', /* [checkToken, tokenCanAdmin], */controlador.deactivateUsers);
router.delete('/users/delete', /* [checkToken, tokenCanAdmin], */controlador.deleteUsers );

module.exports = router;