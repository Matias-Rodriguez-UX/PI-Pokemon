import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonByID } from "../actions";
import { Link, useParams } from 'react-router-dom'
import { Loader } from "./Loader";

export default function Details() {
    const urlimg = 'https://play-lh.googleusercontent.com/wAWerkEu_g2_BMCl85WKqN2mxn0xW1O22nV6yJOayrMKu9pqtrLMn7S2Zd1xaykKm0g'
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    let { id } = useParams()

    const changeLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 9000)
    }

    useEffect(() => {
        dispatch(getPokemonByID(id))
        changeLoading()
    }, [dispatch, id])

    const pokemonDetails = useSelector((state) => state.pokemon)
    let pokemon
    if (Array.isArray(pokemonDetails) && pokemonDetails.length > 0) { pokemon = pokemonDetails[0] }

    return (
        <div>
            {
                loading ?
                    <Loader /> :
                    Array.isArray(pokemonDetails) && pokemonDetails.length > 0 ?
                        <div>
                            <h1>{pokemon.name}</h1>
                            <img src={!pokemon.image ? urlimg : pokemon.image} alt="pokemon img" />
                            <h4>Height: {pokemon.height}</h4>
                            <h4>Weight: {pokemon.weight}</h4>
                            <h4>HP: {pokemon.hp}</h4>
                            <h4>Attack: {pokemon.attack}</h4>
                            <h4>Defense: {pokemon.defense}</h4>
                            <h4>Speed: {pokemon.speed}</h4>
                            <h4>Types:</h4>
                            {!pokemon.created_DB ? pokemon.types?.map((type, index) => <p key={index}>{type}</p>) : pokemon.types?.map((type, index) => <p key={index}>{type.name}</p>)}
                        </div> :
                        <div>
                            <h1>Pokemon not found</h1>
                        </div>
            }
            <Link to='/home'>
                <button>Back</button>
            </Link>
        </div>
    )

}

// id: detailsPoke.id,
// name: detailsPoke.name,
// types: detailsPoke.types.map(el => el.type.name),
// height: detailsPoke.height,
// weight: detailsPoke.weight,
// image: detailsPoke.sprites.other.dream_world.front_default,
// hp: detailsPoke.stats[0].base_stat,
// attack: detailsPoke.stats[1].base_stat,
// defense: detailsPoke.stats[2].base_stat,
// speed: detailsPoke.stats[5].base_stat,