import axios from 'axios'
import { GET_POKEMONS, FILTER_BY_TYPE, FILTER_CREATED, GET_TYPES, ORDER_A_TO_Z, ORDER_BY_ATTACK, GET_POKEMONS_BY_NAME, GET_POKEMON_BY_ID, LOADING_ACTION } from './allActions';

const headers = {
    headers: {
        "accept-encoding": null,
    }
}

export function getPokemons() {
    return async function (dispatch) {
        try {
            let info = await axios.get('http://localhost:3001/pokemons', headers);
            return (dispatch({
                type: GET_POKEMONS,
                payload: info.data
            }),
                dispatch(loadingAction(false)))
        } catch (error) {
            console.log("Error", error)
        }

    }
}

export function getPokemonsByName(name) {
    return async function (dispatch) {
        try {
            let info = await axios.get(`http://localhost:3001/pokemons?name=${name}`, headers)
            return (dispatch({
                type: GET_POKEMONS_BY_NAME,
                payload: info.data
            }),
                dispatch(loadingAction(false)))
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function filterPokemonByStatus(payload) {
    return (
        {
            type: FILTER_BY_TYPE,
            payload
        }
    )
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            let info = await axios.get('http://localhost:3001/types', headers);
            return (dispatch({
                type: GET_TYPES,
                payload: info.data
            }))
        } catch (error) {
            console.log("ERROR", error)
        }

    }
}

export function orderAtoZ(payload) {
    return {
        type: ORDER_A_TO_Z,
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function postPokemon(payload) {
    return async function () {
        try {
            let info = await axios.post('http://localhost:3001/pokemons', payload);
            return (info)
        } catch (error) {
            console.log("ERROR", error)
        }

    }
}

export function getPokemonByID(id) {
    return async function (dispatch) {
        try {
            let info = await axios.get(`http://localhost:3001/pokemons/${id}`, headers)
            return (dispatch({
                type: GET_POKEMON_BY_ID,
                payload: info.data
            }),
                dispatch(loadingAction(false)))
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function loadingAction(payload) {
    return {
        type: LOADING_ACTION,
        payload,
    }
}