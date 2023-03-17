const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = "")=>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const esEmailValido = async(correo = "")=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El email ${correo} ya está registrado en la base de datos`)
    }
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El ID ${id} no está registrado en la base de datos`)
    }
}


module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuarioPorId
}