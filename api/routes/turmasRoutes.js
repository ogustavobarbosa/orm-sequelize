const {Router} = require('express')
const turmasController = require('../controllers/turmasController')

const router = Router()

router
    .get('/turmas', turmasController.listarTurmas)
    .get('/turmas/:id', turmasController.listarTurmaPorId)

    .post('/turmas', turmasController.cadastraTurma)
    .post('/turmas/:id/recuperar', turmasController.recuperarTurma)

    .put('/turmas/:id', turmasController.atualizaTurma)

    .delete('/turmas/:id', turmasController.deletarTurma)

module.exports = router

