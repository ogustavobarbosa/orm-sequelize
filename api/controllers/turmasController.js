const database = require("../models")
const Sequelize = require('sequelize');
const {TurmaServices} = require("../services");
const Op = Sequelize.Op;

const turmaServices = new TurmaServices()

class TurmasController{

    static async listarTurmas(req, res){
        const {data_inicial, data_final} = req.query;

        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        try{
            const turmas = await turmaServices.listarTodosOsRegistros({where})
            return res.status(200).json(turmas)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar turmas - ${err.message}`})
        }
    }
    static async listarTurmaPorId(req, res){
        try {
            const {id} = req.params
            const turmas = await turmaServices.buscarRegistro( { id: Number(id) })
            return res.status(200).json(turmas)
        }catch (err){
            return res.status(500).send(`Erro ao Buscar Turma ${id} - ${err.message}`)
        }
    }
    static async cadastraTurma(req, res){
        const turmasReq = req.body;
        console.log(req.body)
        try{
            const turmas = await turmaServices.cadastraRegistro(turmasReq);
            res.status(201).json(turmas)
        }catch (err){
            res.status(500).send(`Erro ao cadastrar uma nova turmas - ${err.message}`)
        }
    }
    static async atualizaTurma(req, res){
        const {id} = req.params;
        const turmasAtualizacoes = req.body;
        try {
            await turmaServices.atualizarRegistro(turmasAtualizacoes, Number(id))
            const registroAtulizado = await turmaServices.buscarRegistro( {id: Number(id)} )
            res.status(200).json(registroAtulizado)
        }catch (err){
            res.status(500).send({message: `Erro ao atulizar a turmas ${id} - ${err.message}`})
        }
    }
    static async deletarTurma(req, res){
        const {id} = req.params;
        try {
            await turmaServices.deletarRegistro({id: Number(id)})
            res.status(200).send({message: `Turma ${id} deletado com sucesso`})
        }catch (err){
            res.status(500).send({message: `Falha ao apagar a turmas ${id}`})
        }
    }
    static async recuperarTurma(req, res){
        const {id} = req.params;
        try{
            await turmaServices.recuperarRegistro({id: Number(id)} )
            res.status(200).send(`Turma ${id} recuperado com sucesso`)
        }catch (err) {
            res.status(500).send({message: `Falha ao recuperar a turma ${id}`})
        }
    }

}

module.exports = TurmasController
