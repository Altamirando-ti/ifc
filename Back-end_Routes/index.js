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

//-------- Rotas para PROFESSORES -------------
// //Rota de requisição pelo método get
// app.get('/professores', (req,res) => { 
//     //carrega o arquivo professores.json
//     const professores = require('./public/professores.json');
//     res.json(professores);//Envia arquivo JSON como resposta
// });

// //Rota de requisição pelo método post
// app.post('/professores', (req,res) => {
//     console.log(req.body)
//     res.send('A requisição POST para professores/ chegou'+req.body.nomeProfessor);
// });

// app.put('/professores', (req,res) => {
//     console.log(req.body);
//     res.send('A requisição PUT para professores/ chegou'+req.body.codigo);
// });

// app.delete('/professores', (req,res) => {
//     console.log(req.body);
//     res.send('A requisição DELETE para professores/ chegou'+req.body.codigo);
// });

//-------- Rotas para CURSOS -------------
// app.get('/cursos',(req,res) => {
//     const cursos = require('./public/cursos.json');
//     res.json(cursos);
// });

// app.post('/cursos', (req,res) => {
//     console.log(req.body)
//     res.send('A requisição POST para cursos/ chegou'+req.body.nomeProfessor);
// });

// app.put('/cursos', (req,res) => {
//     console.log(req.body);
//     res.send('A requisição PUT para cursos/ chegou'+req.body.codigo);
// });

// app.delete('/cursos', (req,res) => {
//     console.log(req.body);
//     res.send('A requisição DELETE para cursos/ chegou'+req.body.codigo);
// });

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});