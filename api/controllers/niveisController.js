// const database = require("../models")
const { NiveisServices } = require('../services')

const niveisServices = new NiveisServices()

class NiveisController{

    static async listarNiveis(req, res){
        try{
            const niveis = await niveisServices.listarTodosOsRegistros()
            return res.status(200).json(niveis)
        }catch (err){
            return res.status(500).send({message: `Erro ao listar niveis - ${err.message}`})
        }
    }
    static async listarNivelPorId(req, res){
        const {id} = req.params
        try {
            const niveis = await niveisServices.buscarRegistro({id: Number(id)})
            return res.status(200).json(niveis)
        }catch (err){
            return res.status(500).send(`Erro ao Buscar Nivel ${id} - ${err.message}`)
        }
    }
    static async cadastraNivel(req, res){
        const niveisReq = req.body;
        try{
            const niveis = await niveisServices.cadastraRegistro(niveisReq);
            res.status(201).json(niveis)
        }catch (err){
            res.status(500).send(`Erro ao cadastrar uma nova niveis - ${err.message}`)
        }
    }
    static async atualizaNivel(req, res){
        const {id} = req.params;
        const niveisAtualizacoes = req.body;
        try {
            await niveisServices.atualizarRegistro(niveisAtualizacoes,  Number(id))
            const registroAtulizado = await niveisServices.buscarRegistro({id: Number(id)})
            res.status(200).json(registroAtulizado)
        }catch (err){
            res.status(500).send({message: `Erro ao atulizar a niveis ${id} - ${err.message}`})
        }
    }
    static async deletarNivel(req, res){
        const {id} = req.params;
        try {
            await niveisServices.deletarRegistro({id: Number(id)})
            res.status(200).send({message: `Nivel ${id} deletado com sucesso`})
        }catch (err){
            res.status(500).send({message: `Falha ao apagar a niveis ${id}`})
        }
    }
    static async recuperarNivel(req, res){
        const {id} = req.params;
        try{
            await niveisServices.recuperarRegistro({ id: Number(id) })
            res.status(200).send(`Nível ${id} recuperado com sucesso`)
        }catch (err) {
            res.status(500).send({message: `Falha ao recuperar a nível ${id}`})
        }
    }

}

module.exports = NiveisController
