import { FILTER_BY_TYPE, FILTER_CREATED, GET_POKEMONS, GET_POKEMONS_BY_NAME, GET_POKEMON_BY_ID, GET_TYPES, LOADING_ACTION, ORDER_A_TO_Z, ORDER_BY_ATTACK, POST_POKEMON } from "../actions/allActions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokemon: [],
    showLoading: false,
}

function sortArrayAtoZ(x, y) {
    if (x.name < y.name) { return -1; }
    if (x.name > y.name) { return 1; }
    return 0;
}
function sortArrayZtoA(x, y) {
    if (x.name > y.name) { return -1; }
    if (x.name < y.name) { return 1; }
    return 0;
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: !state.allPokemons.length ? action.payload : state.allPokemons,
            }
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons
            const filterDB = allPokemons.filter(el => el.created_DB)
            console.log(filterDB)
            const resultDB = []
            filterDB.forEach(poke => {
                for (const type of poke.types) {
                    if (type.name === action.payload) {
                        resultDB.push(poke)
                    }
                }
            })
            console.log(resultDB)
            const typeFilter = action.payload === "all" ? allPokemons : [...allPokemons.filter(el => el.types.includes(action.payload)), ...resultDB]
            console.log(typeFilter)
            return {
                ...state,
                pokemons: typeFilter
            }
        case FILTER_CREATED:
            const allPoke = state.allPokemons
            const creationFilter = action.payload === "db" ? allPoke.filter(el => el.created_DB) : allPoke.filter(el => !el.created_DB)
            return {
                ...state,
                pokemons: action.payload === "all" ? allPoke : creationFilter,
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case ORDER_A_TO_Z:
            const pokemonsOrganized = action.payload === "a" ? state.pokemons.sort(sortArrayAtoZ) : state.pokemons.sort(sortArrayZtoA)
            return {
                ...state,
                pokemons: pokemonsOrganized
            }
        case ORDER_BY_ATTACK:
            console.log(action.payload)
            const pokemonsByAttack = action.payload === "high" ? state.pokemons.sort(((b, a) => a.attack - b.attack)) : state.pokemons.sort((b, a) => b.attack - a.attack)
            console.log(pokemonsByAttack)
            return {
                ...state,
                pokemons: pokemonsByAttack
            }
        case GET_POKEMONS_BY_NAME:
            const pokemonByName = action.payload
            console.log(pokemonByName)
            return {
                ...state,
                pokemons: pokemonByName
            }
        case POST_POKEMON:
            return {
                ...state
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemon: action.payload
            }
        case LOADING_ACTION:
            return {
                ...state,
                showLoading: action.payload
            }

        default:
            return state;
    }

}