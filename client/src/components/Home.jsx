import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from "../actions";
import { Link } from 'react-router-dom'
import { Filters } from "./Filters";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemons())
    }

    return (
        <div>
            <Link to='/pokemons'>
                <button>Create Pokemon</button>
            </Link>
            <h1>Pokedex</h1>
            <button onClick={e => { handleClick(e) }}>Clear Pokefilters</button>
            <Filters></Filters>
            {allPokemons?.map(el =>
                <Card key={el.id} id={el.id} name={el.name} image={el.image} types={el.types} />
            )}
        </div>
    )
}


