const { Router } = require('express');
const router = new Router();


const UsuarioController = require('../controllers/usuarios.controller');

router.post('/cadastro', UsuarioController.postCadastroUsuario);

router.post('/login', UsuarioController.postLoginUsuario)

module.exports = router;
