import axios from 'axios'

export default getInfoPokemonByName = async (name) => {
    name.toLowercase()
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        const infoFirst = await axios.get(`${url}`)
        const detailsPoke = infoFirst.data
        const poke = {
            id: detailsPoke.id,
            name: detailsPoke.name,
            types: detailsPoke.map(types => types.type.name),
            height: detailsPoke.height,
            weight: detailsPoke.weight,
            img: detailsPoke.sprites.other.dream_world.front_default,
            hp: detailsPoke.stats[0]['base_stat'],
            attack: detailsPoke.stats[1]['base_stat'],
            defense: detailsPoke.stats[2]['base_stat'],
            speed: detailsPoke.stats[5]['base_stat'],
        }
        return poke
    } catch (error) {
        return ({ message: 'Pokemon not found...' })
    }
}