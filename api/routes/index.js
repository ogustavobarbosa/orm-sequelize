const express = require("express")
const pessoas = require('./pessoasRoutes')
const niveis = require('./NiveisRoutes')
const turmas = require('./turmasRoutes')


module.exports = app => {

    app.get('/', (req, res) => res.status(200).json({oi: 'sd'}))

    app.use(
        express.json(),
        pessoas, niveis,
        turmas
    )



}

