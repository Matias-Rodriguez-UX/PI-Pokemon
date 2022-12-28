import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../actions/index.js";


function validation(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "You must fill in the name field"
    }
    if (!input.types.length) {
        errors.types = "You must have at least one pokemon type selected"
    }
    return errors
}

export function CreateForm() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const history = useHistory()
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
    });
    const [activeButton, setActiveButton] = useState(false)


    useEffect(() => {
        dispatch(getTypes());
        if (input.types.length === 0 || input.name === "") {
            setActiveButton(false)
        } else {
            setActiveButton(true)
        }
    }, [input])

    function handleChanges(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validation({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) {
        e.preventDefault()
        if (e.target.checked) {
            if (!input.types.includes(e.target.value)) {
                setInput({
                    ...input,
                    types: [...input.types, e.target.value]
                })
            } else {
                setInput({
                    ...input,
                    types: input.types.filter(el => el !== e.target.value)
                })
            }
        } else {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            })
        }


    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Pokemon Creado")
        setInput({
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            image: "",
            types: [],
        })
        history.push('/home')
    }
    console.log(input)
    return (
        <div>
            <Link to={'/home'}><button>Back to home</button></Link>
            <h1>Create your Pokemon</h1>
            <form action="" onSubmit={(e) => (handleSubmit(e))}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' value={input.name}
                        onChange={e => handleChanges(e)} required />
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label htmlFor="HP">HP</label>
                    <input min="1" type='number' id="HP" name='hp' value={input.hp}
                        onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="attack">Atack</label>
                    <input min="1" type='number' id="attack" name='attack' value={input.attack} onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="defense">Defense</label>
                    <input min="1" type='number' id="defense" name='defense' value={input.defense} onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="speed">Speed</label>
                    <input min="1" type='number' id="speed" name='speed' value={input.speed} onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <input type='number' id="height" name='height' value={input.height} onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input type='number' id="weight" name='weight' value={input.weight} onChange={e => handleChanges(e)} required />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type='text' id="image" name='image' value={input.image} onChange={e => handleChanges(e)} />
                </div>
                <div>
                    <label htmlFor="types">Types</label>
                    {types?.map((el, index) =>
                        <div key={index}>
                            <input type='checkbox' id={el.id} value={el.name} onChange={(e) => { handleCheck(e) }} /> {el.name}
                        </div>
                    )}
                    {error.types && <p>{error.types}</p>}
                </div>
                <input type="submit" value="Create" disabled={!activeButton} />
            </form>
        </div>
    )
}