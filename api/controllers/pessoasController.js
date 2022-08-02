const Sequelize = require('sequelize')
const { PessoasServices, MatriculasServices} = require('../services')

const pessoasServices = new PessoasServices()
const matriculasServices = new MatriculasServices()



class PessoasController{

    static async listarPessoasAtivas(req, res){
        try{
            const pessoas = await pessoasServices.listarTodosRegistrosAtivos()
            return res.status(200).json(pessoas)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar pessoas - ${err.message}`})
        }
    }
    static async listarTodasAsPessoas(req, res){
        const pessoas = await pessoasServices.listarTodosRegistros()
        try{
            return res.status(200).json(pessoas)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar pessoas - ${err.message}`})
        }
    }
    static async listarPessoaPorId(req, res){
        const {id} = req.params
        try {
            const pessoa = await pessoasServices.buscarRegistro({id: Number(id)})
            return res.status(200).json(pessoa)
        }catch (err){
            return res.status(500).send(`Erro ao Buscar Pessoa ${id} - ${err.message}`)
        }
    }
    static async cadastraPessoa(req, res){
        const pessoaReq = req.body;
        try{
            const pessoa = await pessoasServices.cadastraRegistro(pessoaReq);
            res.status(201).json(pessoa)
        }catch (err){
            res.status(500).send(`Erro ao cadastrar uma nova pessoa - ${err.message}`)
        }
    }
    static async atualizaPessoa(req, res){
        const {id} = req.params;
        const pessoaAtualizacoes = req.body;
        try {
            await pessoasServices
                .atualizarRegistro(pessoaAtualizacoes, Number(id))

            const registroAtualizado =
                await pessoasServices
                    .buscarRegistro({id:Number(id)})

            return res.status(200).json(registroAtualizado)
        }catch (err){
            return res.status(500).send({message: `Erro ao atulizar a pessoa ${id} - ${err.message}`})
        }
    }
    static async deletarPessoa(req, res){
        const {id} = req.params;
        try {
            await pessoasServices.deletarRegistro({ id: Number(id) })
            return res.status(200).send({message: `Pessoa ${id} deletado com sucesso`})
        }catch (err){
            return res.status(500).send({message: `Falha ao apagar a pessoa ${id}`})
        }
    }
    static async recuperarPessoa(req, res){
        const {id} = req.params;
        try {
            await pessoasServices.recuperarRegistro(Number(id))
            return res.status(200).send({message: `Pessoa ${id} recuperada com sucesso`})
        }catch (err){
            return res.status(500).send({message: `Falha ao recuperar a pessoa ${id}`})
        }
    }


    //Matriculas
    static async listarMatriculaPorId(req, res){
        const {estudanteId, matriculaId} = req.params
        try{
            const matricula = await matriculasServices
                .buscarRegistro(
                    {
                        estudante_id:Number(estudanteId),
                        id:Number(matriculaId)
                    })
            return res.status(200).json(matricula)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar a matricula ${matriculaId} - ${err.message}`})
        }
    }
    static async listarMatriculasPorEstudante(req, res){
        const {estudanteId} = req.params
        try{
            const pessoa = await  pessoasServices.buscarRegistro({id : Number(estudanteId)})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar matriculas - ${err.message}`})
        }
    }
    static async cadastrarMatricula(req, res){
        const {estudanteId} = req.params;
        const matriculaReq = {...req.body, estudante_id: estudanteId}
        try{
            const matricula = await matriculasServices.cadastraRegistro(matriculaReq)
            return res.status(200).json(matricula)
        }catch (err) {
            return res.status(500).send({message: `Erro ao cadastrar matricula - ${err.message}`})
        }
    }
    static async atualizaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params;
        const matriculaAtualizacoes = req.body;
        try {
            await matriculasServices.atualizarRegistros(
                matriculaAtualizacoes, {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            )
            const registroAtualizado = await matriculasServices
                .buscarRegistro({
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                })

            return res.status(200).json(registroAtualizado)
        }catch (err){
            return res.status(500).send({message: `Erro ao atulizar a pessoa ${matriculaId} - ${err.message}`})
        }
    }
    static async deletarMatricula(req, res){
        const {estudanteId, matriculaId} = req.params
        try{
            await matriculasServices.deletarRegistro({
                id: Number(matriculaId),
                estudante_id:Number(estudanteId)
            })
            return res.status(200).send(`A matricula ${matriculaId} do aluno ${estudanteId} foi deletada com sucesso`)
        }catch (err){
            res.status(500).send({message: `Erro ao deletar a matricula ${matriculaId} do aluno ${estudanteId} - ${err.message}`})

        }
    }
    static async recuperarMatricula(req, res){
        const {matriculaId, estudanteId} = req.params;
        try {
            await matriculasServices.recuperarRegistro( {estudante_id: Number(estudanteId), id: Number(matriculaId)} )
            res.status(200).send({message: `Matricula ${matriculaId} recuperada com sucesso`})
        }catch (err){
            res.status(500).send({message: `Falha ao recuperar a matricula ${matriculaId}`})
        }
    }
    static async listarMatriculaPorTurma(req, res){
        const {turmaId} = req.params
        try{
            const matricula = await matriculasServices.listarRegistrosEQuantidade(
                {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                    },
                {
                    limit: 1
                }
            )
            return res.status(200).json(matricula)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar a matricula  - ${err.message}`})
        }
    }
    static async listarTurmasLotadas (req, res){
        const lotacaoTurma = 2
        try{

            const turmasLotadas = await matriculasServices.listarRegistrosEQuantidade(
                {
                    status: 'confirmado'
                },
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })

            return res.status(200).json(turmasLotadas)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar a matricula - ${err.message}`})
        }
    }

    static async cancelaPessoa(req, res){
        const {estudanteId} = req.params;
        try{
            await pessoasServices.cancelaEstudanteEMatricula(Number(estudanteId))
            return res.status(200).json(`Matriculas referente ao estudante: ${estudanteId} foram canceladas com sucesso`)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar a matricula - ${err.message}`})
        }
    }



}

module.exports = PessoasController
