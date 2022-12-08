const axios = require('axios')
const headers = {
    headers: {
        "accept-encoding": null,
    }
}
const getTypesFromApi = async () => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type', headers)
    const typesResult = typesApi.data.results.map(el => el.name)
    return typesResult
}

module.exports = {
    getTypesFromApi
}