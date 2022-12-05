const { getDBinfo } = require('./getDBinfo')
const { getPokemonsApi } = require('./getPokemonsApi')

export default getAllPokemons = async () => {
    const allPokemons = await getPokemonsApi().concat(getDBinfo())
    return allPokemons
}
