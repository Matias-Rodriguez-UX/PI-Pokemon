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
            let pokeArray = []
            pokeArray.push(pokeDB)
            return res.status(200).send(pokeArray)
        }

        let pokeName = await getInfoPokemonByName(name)
        pokeName ?
            res.status(200).send(pokeName) :
            res.status(404).send({ error: "Pokemon not Found" })
    } else {
        res.status(200).send(pokemons)
    }
})

router.get('/types', async (req, res) => {
    try {
        const typesFromApi = await getTypesFromApi()
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
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

router.get('/pokemons/:id', async (req, res) => {
    let { id } = req.params
    let pokemonId
    try {
        if (id) {
            if (id.length < 32) {
                pokemonId = await getPokemonByIDapi(id)
            } else {
                pokemonId = [await Pokemon.findOne({
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
                })]
            }
            if (pokemonId.length) {
                res.status(200).send(pokemonId)
            } else {
                res.status(404).send({ message: `The id: ${id} does not belong to a pokemon` })
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
    let typesCreated = []
    name = name.toLowerCase()
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
        let resp
        for (const type of types) {
            typesCreated.push(resp = await Types.findOne({
                where: {
                    name: {
                        [Op.or]: [type]
                    }
                }
            }))
        }
        if (!typesCreated.length) throw new Error('The types of the new pokemon do not match the existing ones')
        try {
            await createPoke.addTypes(typesCreated)
            res.status(200).send({ message: "Pokemon created" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

router.delete('/pokemons/:id', async (res, req) => {
    let id = req.params.id
    Pokemon.findByPk(id)
        .then(pokemon => {
            pokemon.removeTypes();
            return pokemon
        })
        .then(pokemon => pokemon.destroy())
        .then(r => res.status(200).send({ message: "Pokemon deleted" }))
        .catch(err => res.status(404).send({ message: "Error: " + err }))
})

// Pokemon.findByPk(id)
//         .then(pokemon => {
//             pokemon.removeTypes()
//             return pokemon;
//         })
//         .then(pokemon => pokemon.destroy())
//         .then(r => res.status(200).send('Pokemon eliminado correctamente!'))
//         .catch(err => console.log(err));



module.exports = router;
