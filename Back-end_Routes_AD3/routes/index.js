const express = require('express');
const router = express.Router();

//rotas para professores
router.use('/professores', require('./professores'));

//rotas para cursos
router.use('/cursos', require('./cursos'));

// rotas para disciplinas
// router.use('/disciplinas', require('./disciplinas'))

module.exports=router;

