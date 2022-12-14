import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterCreated, filterPokemonByStatus, getTypes, orderAtoZ } from "../actions";


export function Filters() {
    let dispatch = useDispatch()


    function handleOrderAlph(e) {
        e.preventDefault()
        dispatch(orderAtoZ(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
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
        </div>
    )
}