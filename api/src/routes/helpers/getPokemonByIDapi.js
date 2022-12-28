const axios = require('axios')

const headers = {
    headers: {
        "accept-encoding": null,
    }
}

const getPokemonByIDapi = async (id) => {
    id = parseInt(id)
    let pokeArray = []
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const infoFirst = await axios.get(url, headers)
        const detailsPoke = infoFirst.data
        const poke = {
            id: detailsPoke.id,
            name: detailsPoke.name,
            types: detailsPoke.types.map(el => el.type.name),
            height: detailsPoke.height,
            weight: detailsPoke.weight,
            image: detailsPoke.sprites.other.dream_world.front_default,
            hp: detailsPoke.stats[0].base_stat,
            attack: detailsPoke.stats[1].base_stat,
            defense: detailsPoke.stats[2].base_stat,
            speed: detailsPoke.stats[5].base_stat,
        }
        pokeArray.push(poke)
        return pokeArray
    } catch (error) {
        return ({ message: 'Pokemon not found...' })
    }
}

module.exports = {
    getPokemonByIDapi
}