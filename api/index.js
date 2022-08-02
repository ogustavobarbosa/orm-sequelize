const express = require('express');
const router = require('./routes');

const port = 3000;
app = express();

router(app)

app.listen(port, ()=> console.log(`Servidor rodando em: http://localhost:${port}`))