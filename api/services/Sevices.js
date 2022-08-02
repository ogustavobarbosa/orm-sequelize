const database = require('../models')

class Sevices{
    constructor(strModelo) {
        this.strModel = strModelo;
    }
    async listarTodosOsRegistros(where={}){
        return await database[this.strModel].findAll(where)
    }
    async atualizarRegistro(dados, id, transaction = {}){
        return await database[this.strModel].update(dados, {where: { id: id }, transaction: transaction})
    }
    async atualizarRegistros(dados, where, transaction = {}){
        return await database[this.strModel].update(dados, {where: where, transaction: transaction},)
    }
    async buscarRegistro(where){
        return await database[this.strModel].findOne({where: where})
    }
    async cadastraRegistro(dados){
        return await database[this.strModel].create(dados)
    }
    async deletarRegistro(where){
        return await database[this.strModel].destroy({where:where})
    }
    async recuperarRegistro(where){
        return await database[this.strModel].restore({where: where})
    }
    async listarRegistrosEQuantidade(where={}, agregadores){
        console.log(where ,agregadores)
        return await database[this.strModel].findAndCountAll({where: {...where}, ...agregadores})

    }





}

module.exports = Sevices