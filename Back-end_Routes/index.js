const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin:'*'
}))

app.get('/', (req,res) => {
    res.send('Olá mundo da Programação Web!');
});

app.get('/sobre', (req,res) => {
    res.send('Esta é a página sobre');
});

// Rota criada
app.use('/', require('./routes'))

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});