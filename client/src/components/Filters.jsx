import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, filterPokemonByStatus, getTypes, orderAtoZ } from "../actions";


export function Filters() {
    let dispatch = useDispatch()
    const allTypes = useSelector((state) => state.types)

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    function handleFilterType(e) {
        e.preventDefault()
        dispatch(filterPokemonByStatus(e.target.value))
    }

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
    }

    function handleOrderAlph(e) {
        e.preventDefault()
        dispatch(orderAtoZ(e.target.value))
    }

    return (
        <div>
            <select name="orderAlph" id="" onChange={(e) => (handleOrderAlph(e))}>
                <option value="a">A to Z</option>
                <option value="z">Z to A</option>
            </select>
            <select name="atack" id="">
                <option value="high">Higher Atack</option>
                <option value="low">Lower Atack</option>
            </select>
            <select name="filterType" id="" onChange={(e) => (handleFilterType(e))}>
                <option value="all">All</option>
                {
                    allTypes?.map(el => <option value={el.name} key={el.id}>{el.name}</option>)
                }
            </select>
            <select name="origin" id="" onChange={(e) => (handleFilterCreated(e))}>
                <option value="all">All</option>
                <option value="api">From Api</option>
                <option value="db">From DataBase</option>
            </select>
        </div>
    )
}