const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre = 'no name', apikey, page, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, contraseña, google, ...resto } = req.body;

    if( contraseña ){
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({nombre, correo, contraseña, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

    // guardar en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // fiscamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}