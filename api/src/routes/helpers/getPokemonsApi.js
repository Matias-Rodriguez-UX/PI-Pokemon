const axios = require('axios')

const headers = {
    headers: {
        "accept-encoding": null,
    }
}

const getPokemonsApi = async () => {
    const infoFirst = await axios.get(`https://pokeapi.co/api/v2/pokemon`, headers)
    const infoSecond = await axios.get(infoFirst.data.next, headers)
    let pokemonsFourtyUrl = infoFirst.data.results.concat(infoSecond.data.results)

    for (let pokemon of pokemonsFourtyUrl) {
        const detailsUrl = await axios.get(pokemon.url, headers)
        pokemon.id = detailsUrl.data.id
        pokemon.image = detailsUrl.data.sprites.other.dream_world.front_default
        pokemon.types = detailsUrl.data.types.map(type => type.type.name)
    }
    return pokemonsFourtyUrl
};
module.exports = {
    getPokemonsApi
}