import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, filterPokemonByStatus, getPokemons, getTypes, orderAtoZ, orderByAttack, loadingAction } from "../actions";
import { Link } from 'react-router-dom'
import Filters from "./Filters";
import Card from "./Card";
import Paging from './Paging'
import Order from './Order'
import { Searchbar } from "./Searchbar";
import { Loader } from "./Loader";
import './Home.css'

export default function Home() {
    const dispatch = useDispatch()
    const allpoke = useSelector((state) => state.allPokemons)
    const allPokemons = useSelector((state) => state.pokemons)
    const showLoading = useSelector((state) => state.showLoading)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage, setPokemonsPerPage] = useState(12)
    const [order, setOrder] = useState('');
    const allTypes = useSelector((state) => state.types)
    const indexLastPokemon = currentPage * pokemonPerPage
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage
    const currentPokemons = Array.isArray(allPokemons) && allPokemons.length > 1 ? allPokemons.slice(indexFirstPokemon, indexLastPokemon) : allPokemons

    console.log(currentPokemons)

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(allPokemons / pokemonPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        dispatch(loadingAction(true))
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault()
        dispatch(loadingAction(true))
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
        <div className="allPage">
            <div className="headers">
                {
                    showLoading ?
                        <Loader /> :
                        <div>

                            <Searchbar loadingAction={loadingAction} />

                            <div className="filtAndOrds">
                                <Filters
                                    handleFilterType={handleFilterType}
                                    handleFilterCreated={handleFilterCreated}
                                    allTypes={allTypes}
                                />
                                <Order handleOrderAlph={handleOrderAlph} handleOrderByAttack={handleOrderByAttack} />
                            </div>

                            <div className="buttons">
                                <Link to='/pokemon'>
                                    <button className="createButton"> + Create Pokemon</button>
                                </Link>
                                <button className="createButton" onClick={e => handleClick(e)}>Clear Pokefilters</button>
                            </div>
                            <hr />
                        </div>

                }

            </div>


            <div className="CenterBody">
                {
                    !Array.isArray(currentPokemons) ?
                        <h1>{currentPokemons.message}</h1> :
                        showLoading ?
                            <h3> </h3> :
                            <div>
                                <Paging
                                    pokemonsPerPage={pokemonPerPage}
                                    allPokemons={allPokemons.length}
                                    paging={paging}
                                    page={currentPage}
                                    previousPage={previousPage}
                                    nextPage={nextPage}
                                />
                                <div className="Cards">
                                    {currentPokemons.length ? currentPokemons.map(el =>
                                        (!el.hasOwnProperty('created_DB')) ?

                                            <Card key={el.id} id={el.id} name={el.name} image={el.image} types={el.types} />

                                            :

                                            <Card key={el.id} id={el.id} name={el.name} types={el.types?.map(el => el.name)} image={el.image} />


                                    ) : <h1 style={{ color: '#fff', margin: '1rem', padding: '1rem' }}>Pokemon not found</h1>}
                                </div>

                                <Paging
                                    pokemonsPerPage={pokemonPerPage}
                                    allPokemons={allPokemons.length}
                                    paging={paging}
                                    page={currentPage}
                                    previousPage={previousPage}
                                    nextPage={nextPage}
                                />
                            </div>
                }
            </div>

        </div>
    )
}


