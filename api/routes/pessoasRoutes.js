const {Router} = require('express')
const PessoaController = require('../controllers/pessoasController')

const router = Router()

router
    .get('/pessoas', PessoaController.listarTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.listarPessoasAtivas)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.listarMatriculaPorId)
    .get('/pessoas/:estudanteId/matriculas', PessoaController.listarMatriculasPorEstudante)
    .get('/pessoas/:id', PessoaController.listarPessoaPorId)
    .get('/pessoas/matriculas/lotadas', PessoaController.listarTurmasLotadas)
    .get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.listarMatriculaPorTurma)
    .get('/pessoas/:estudanteId/cancelar', PessoaController.cancelaPessoa)

    .post('/pessoas', PessoaController.cadastraPessoa)
    .post('/pessoas/:id/recuperar', PessoaController.recuperarPessoa)
    .post('/pessoas/:estudanteId/matriculas/:matriculaId/recuperar', PessoaController.recuperarMatricula)
    .post('/pessoas/:estudanteId/matriculas', PessoaController.cadastrarMatricula)

    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)

    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletarMatricula)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router

