import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getPokemonsByName } from "../actions";
import './SearchBar.css'

export function Searchbar({ loadingAction }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        let name = e.target.value.toLowerCase()
        setName(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loadingAction(true))
        dispatch(getPokemonsByName(name))
        setName('')
    }

    return (
        <div>
            <input className="searchText" type="text" name="name" id="" placeholder="Search by Name..." value={name} onChange={(e) => handleInput(e)} />
            <input className="searchButton" type="submit" value="Search" onClick={(e) => { handleSubmit(e) }} />
        </div>
    )
}