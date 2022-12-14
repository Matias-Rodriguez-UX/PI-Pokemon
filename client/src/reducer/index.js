import { FILTER_BY_TYPE, FILTER_CREATED, GET_POKEMONS, GET_TYPES, ORDER_A_TO_Z } from "../actions/allActions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
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
                allPokemons: action.payload,
            }
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons
            const typeFilter = action.payload === "all" ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload))
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
        default:
            return state;
    }

}