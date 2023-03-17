const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { ValidarCampos } = require('../middlewares/validar-campos');
const { esRolValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    check('correo').custom(esEmailValido),
    ValidarCampos
], usuariosPut);

router.post('/',[
    check('nombre',"EL nombre es necesario").not().isEmpty(),
    check('correo',"EL correo ingresado no es valido").isEmail(),
    check('correo').custom(esEmailValido),
    check('contraseña',"La contraseña debe tener más de 6 caracteres").isLength({min:6}),
    check('rol').custom(esRolValido),
    ValidarCampos,
], usuariosPost);

router.delete('/:id',[
    check('id','no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    ValidarCampos
],usuariosDelete);

module.exports = router;