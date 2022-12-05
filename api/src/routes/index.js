const { Router } = require('express');
const { getInfoPokemonByName } = require('./helpers/getInfoPokemonByName')
const { getPokemonsApi } = require('./helpers/getPokemonsApi')
const { getDbinfo } = require('./helpers/getDBinfo')
const { getAllPokemons } = require('./helpers/getAllPokemonsFromDB')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





module.exports = router;
