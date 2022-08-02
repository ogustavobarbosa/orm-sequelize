const database = require('../models')
const Services = require('./Sevices')

class PessoasServices extends Services{
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matricula')
    }
    async listarTodosRegistrosAtivos(where= {}){
        return await database[this.strModel].findAll({ where: where })
    }
    async listarTodosRegistros(where = {}){
        return await database[this.strModel].scope('todos').findAll({where: where})
    }
    async cancelaEstudanteEMatricula(id){
        return await database.sequelize.transaction(async t => {
            await super.atualizarRegistro({ativo: false}, id, t)
            await this.matriculas.atualizarRegistros({status:'cancelado'}, {estudante_id:id}, t)
        })
    }


}

module.exports = PessoasServices


