const { Router, express } = require('express');
const { getInfoPokemonByName } = require('./helpers/getInfoPokemonByName')
const { getPokemonsApi } = require('./helpers/getPokemonsApi')
const { getAllPokemons } = require('./helpers/getAllPokemons');
const axios = require('axios');
const { Pokemon, Types } = require('../db.js')
const { Op } = require('sequelize');
const { getTypesFromApi } = require('./helpers/getTypesFromApi');
const { getPokemonByIDapi } = require('./helpers/getPokemonByIDapi');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    const { name } = req.query
    const pokemons = await getAllPokemons()
    if (name) {
        const pokeDB = await Pokemon.findOne({
            where: {
                name: name.toLowerCase()
            },
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
        if (pokeDB) {
            return res.status(200).send(pokeDB)
        }

        let pokeName = await getInfoPokemonByName(name)
        console.log(pokeName)
        pokeName ?
            res.status(200).send(pokeName) :
            res.status(404).send({ error: "Pokemon not Found" })
    } else {
        res.status(200).send(pokemons)
    }
})

router.get('/types', async (req, res) => {

    const typesFromApi = await getTypesFromApi()
    // console.log(typesPoke)
    for (let eachType of typesFromApi) {
        Types.findOrCreate({
            where: {
                name: eachType
            }
        })
    }

    const typesFromDb = await Types.findAll()
    typesFromDb.length ?
        res.send(typesFromDb) :
        res.send("Pokemon`s types not found in DB...")
})

router.get('/pokemons/:id', async (req, res) => {
    let { id } = req.params
    let pokemonId
    try {
        if (id) {
            if (id.length < 32) {
                pokemonId = await getPokemonByIDapi(id)
            } else {
                pokemonId = await Pokemon.findOne({
                    where: {
                        id: id
                    },
                    include: {
                        model: Types,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        },
                    },
                });
            }
            if (pokemonId.length) {
                res.status(200).send(pokemonId)
            } else {
                res.status(404).send(`The id: ${id} does not belong to a pokemon`)
            }
        }
    } catch (error) {
        res.status(404).send(error)
    }


})

router.post('/pokemons', async (req, res) => {
    let {
        name, types, height, weight, image, hp, attack, defense, speed, created_DB,
    } = req.body
    let createPoke
    let typesCreated
    name.toLowerCase()
    try {
        createPoke = await Pokemon.create({
            name,
            height,
            weight,
            image,
            hp,
            attack,
            defense,
            speed,
            created_DB
        })
        typesCreated = await Types.findOne({
            where: {
                name: {
                    [Op.or]: types
                }
            }
        })
        if (!typesCreated.length) throw new Error('Los tipos del nuevo pokemon no coinciden con los existentes')
        await createPoke.addTypes(typesCreated)
    } catch (error) {
        res.status(400).send(error)
    }



    res.status(200).send("Pokemon created")
})



module.exports = router;
