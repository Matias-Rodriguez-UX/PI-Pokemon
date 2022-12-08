const { getDBInfo } = require('./getDBinfo')
const { getPokemonsApi } = require('./getPokemonsApi')

const getAllPokemons = async () => {
    const infoaApi = await getPokemonsApi()
    const infodb = await getDBInfo()

    const allPokemons = infoaApi.concat(infodb)
    return allPokemons
}

module.exports = {
    getAllPokemons
}
