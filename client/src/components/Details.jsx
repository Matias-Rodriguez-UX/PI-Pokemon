import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonByID, loadingAction } from "../actions";
import { Link, useParams } from 'react-router-dom'
import { Loader } from "./Loader";
import './Details.css'
const typeColor = {
    bug: "#26de81",
    dragon: "#615631",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#003535",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#cc00c9",
    poison: "#6c5ce7",
    psychic: "#242061",
    rock: "#2d3436",
    water: "#0190FF",
    word: "#fff",
    dark: "#0f0f0f",
    shadow: "#2d0000",
}

export default function Details() {
    const urlimg = 'https://play-lh.googleusercontent.com/wAWerkEu_g2_BMCl85WKqN2mxn0xW1O22nV6yJOayrMKu9pqtrLMn7S2Zd1xaykKm0g'
    const showLoading = useSelector((state) => state.showLoading)
    const dispatch = useDispatch()
    let { id } = useParams()


    useEffect(() => {
        dispatch(loadingAction(true))
        dispatch(getPokemonByID(id))
    }, [dispatch, id])

    const pokemonDetails = useSelector((state) => state.pokemon)
    let pokemon
    if (Array.isArray(pokemonDetails) && pokemonDetails.length > 0) { pokemon = pokemonDetails[0] }

    return (
        <div>
            {
                showLoading ?
                    <Loader /> :
                    Array.isArray(pokemonDetails) && pokemonDetails.length > 0 ?
                        <div className="bigCard">
                            <div className="bigCard-img">
                                <img src={!pokemon.image ? urlimg : pokemon.image} alt="pokemon img" />
                            </div>
                            <div className="bigCard-info">
                                <h1>{pokemon.name}</h1>
                                <h3 className="h2-id">id # {pokemon.id}</h3>
                                <h4>Height: {pokemon.height} mts</h4>
                                <h4>Weight: {pokemon.weight} Kg</h4>
                                <h4>HP: {pokemon.hp} pts</h4>
                                <h4>Attack: {pokemon.attack} pts</h4>
                                <h4>Defense: {pokemon.defense} pts</h4>
                                <h4>Speed: {pokemon.speed} pts</h4>
                            </div>
                            <div className="bigCard-types">
                                <h4>Types:</h4>
                                {!pokemon.created_DB ?
                                    pokemon.types?.map((type, index) =>
                                        <p key={index} style={{ color: '#fff', backgroundColor: typeColor[type] }}>{type}</p>) :
                                    pokemon.types?.map((type, index) =>
                                        <p key={index} style={{ color: '#fff', backgroundColor: typeColor[type.name] }}>{type.name}</p>)}
                            </div>

                        </div> :
                        <div>
                            <h1>Pokemon not found</h1>
                        </div>
            }
            <Link to='/home'>
                <button className="backButton">Back</button>
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