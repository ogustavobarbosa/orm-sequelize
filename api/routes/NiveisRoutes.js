const {Router} = require('express')
const niveisController = require('../controllers/niveisController')

const router = Router()

router
    .get('/niveis', niveisController.listarNiveis)
    .get('/niveis/:id', niveisController.listarNivelPorId)

    .post('/niveis', niveisController.cadastraNivel)
    .post('/niveis/:id/recuperar', niveisController.recuperarNivel)

    .put('/niveis/:id', niveisController.atualizaNivel)

    .delete('/niveis/:id', niveisController.deletarNivel)

module.exports = router

