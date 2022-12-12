import axios from 'axios'
import { GET_POKEMONS } from './allActions';

const headers = {
    headers: {
        "accept-encoding": null,
    }
}

export function getPokemons() {
    return async function (dispatch) {
        let info = await axios.get('http://localhost:3001/pokemons', headers);
        return (dispatch({
            type: GET_POKEMONS,
            payload: info.data
        }))
    }
}