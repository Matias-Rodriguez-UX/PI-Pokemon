import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, filterPokemonByStatus, getPokemons, getTypes, orderAtoZ, orderByAttack } from "../actions";
import { Link } from 'react-router-dom'
import Filters from "./Filters";
import Card from "./Card";
import Paging from './Paging'
import Order from './Order'
import { Searchbar } from "./Searchbar";
import { Loader } from "./Loader";

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage, setPokemonsPerPage] = useState(12)
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(false)
    const allTypes = useSelector((state) => state.types)
    const indexLastPokemon = currentPage * pokemonPerPage
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage
    const currentPokemons = Array.isArray(allPokemons) && allPokemons.length ? allPokemons.slice(indexFirstPokemon, indexLastPokemon) : allPokemons

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const changeLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 9000)
    }
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        changeLoading()
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
    function handleOrderByAttack(e) {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
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

            <Link to='/pokemon'>
                <button>Create Pokemon</button>
            </Link>
            <h1>Pokedex</h1>
            <Searchbar changeLoading={changeLoading} />
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
            <Order handleOrderAlph={handleOrderAlph} handleOrderByAttack={handleOrderByAttack} />

            {loading ?
                <Loader /> :
                !Array.isArray(currentPokemons) ?
                    <h1>{currentPokemons.message}</h1> :
                    currentPokemons.map(el =>
                        (!el.hasOwnProperty('created_DB')) ?
                            <Card key={el.id} id={el.id} name={el.name} image={el.image} types={el.types} />
                            :
                            <Card key={el.id} id={el.id} name={el.name} types={el.types?.map(el => el.name)} image={el.image} />
                    )}
        </div>
    )
}


