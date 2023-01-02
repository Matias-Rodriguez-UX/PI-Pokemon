import React from "react";
import { Link } from 'react-router-dom'
import './Card.css'

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    word: "#fff"
}

export default function Card({ name, image, types, id }) {
    const urlImgDefault = 'https://play-lh.googleusercontent.com/wAWerkEu_g2_BMCl85WKqN2mxn0xW1O22nV6yJOayrMKu9pqtrLMn7S2Zd1xaykKm0g'
    return (
        <div className="container">
            <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
                <div className="card">
                    <img src={image ? image : urlImgDefault} alt="pokemon" />

                    <h3 className="poke-name">{name}</h3>

                    {types && types?.map((el, index) =>
                        <span className="types" key={index}
                            style={{
                                backgroundColor: typeColor[el],
                                textDecoration: "none",
                                color: typeColor.word
                            }}>{el} </span>
                    )}

                </div>
            </Link>
        </div>


    )
}