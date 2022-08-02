const database = require('../models')
const Services = require('./Sevices')

class MatriculasSevices extends Services{
    constructor() {
        super('Matricula')
    }
}


module.exports = MatriculasSevices