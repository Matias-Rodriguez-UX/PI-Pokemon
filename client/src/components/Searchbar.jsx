import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getPokemonsByName } from "../actions";

export function Searchbar({ changeLoading }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPokemonsByName(name))
        changeLoading()
        setName('')
    }

    return (
        <div>
            <input type="text" name="name" id="" placeholder="Search by Name..." onChange={(e) => handleInput(e)} />
            <input type="submit" value="Buscar" onClick={(e) => { handleSubmit(e) }} />
        </div>
    )
}