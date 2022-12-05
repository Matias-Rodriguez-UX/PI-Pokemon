import axios from 'axios'

export default getPokemonsApi = async () => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon'
        const infoFirst = await axios.get(`${url}`)
        const infoSecond = await axios.get(`${infoFirst.data.next}`)
        let pokemonsFourty = infoFirst.data.results.concat(infoSecond.data.results)

        for (let pokemon of pokemonsFourty) {
            const detailsUrl = await axios.get(`${pokemon.url}`)
            pokemon.id = detailsUrl.data.id
            pokemon.image = detailsUrl.data.sprites[other][dream_world][front_default]
            pokemon.types = detailsUrl.data.types.map(type => type.type.name)
        }
        return pokemonsFourty
    } catch (error) {
        return error
    }
}