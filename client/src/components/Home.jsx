import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, filterPokemonByStatus, getPokemons, getTypes, orderAtoZ } from "../actions";
import { Link } from 'react-router-dom'
import { Filters } from "./Filters";
import Card from "./Card";
import Paging from './Paging'
import Order from './Order'

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage, setPokemonsPerPage] = useState(12)
    const [order, setOrder] = useState('');
    const allTypes = useSelector((state) => state.types)

    const indexLastPokemon = currentPage * pokemonPerPage
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon)

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, []);

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemons())
    }

    function handleOrderAlph(e) {
        e.preventDefault()
        dispatch(orderAtoZ(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterType(e) {
        e.preventDefault()
        dispatch(filterPokemonByStatus(e.target.value))
    }

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
    }

    return (
        <div>
            <Link to='/pokemons'>
                <button>Create Pokemon</button>
            </Link>
            <h1>Pokedex</h1>
            <button onClick={e => handleClick(e)}>Clear Pokefilters</button>
            <Paging
                pokemonsPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                paging={paging}
            />
            <Filters
                handleFilterType={handleFilterType}
                handleFilterCreated={handleFilterCreated}
                allTypes={allTypes}
            />
            <Order handleOrderAlph={handleOrderAlph} />

            {currentPokemons?.map(el =>
                <Card key={el.id} id={el.id} name={el.name} image={el.image} types={el.types} />
            )}
        </div>
    )
}


