import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../actions/index.js";
import './CreateForm.css'
import { useModal } from "./modals/hooks/useModal.jsx";
import Modal from "./modals/Modal.jsx";


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

    }, [input, dispatch])

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

    return (
        <div>
            <h1 className="create-Title">Create your Pokemon</h1>
            <div className="form-creation">
                <form action="" onSubmit={(e) => (handleSubmit(e))} >
                    <div className="input-name">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name='name' value={input.name}
                            onChange={e => handleChanges(e)} required />
                        {error.name && <p className="error">{error.name}</p>}
                    </div>
                    <div className="input-height">
                        <label htmlFor="height">Height</label>
                        <input min="0" step=".1" type='number' id="height" name='height' value={input.height} onChange={e => handleChanges(e)} required />
                        <h4>{input.height} mts</h4>
                    </div>
                    <div className="input-weight">
                        <label htmlFor="weight">Weight</label>
                        <input min="0" step=".1" type='number' id="weight" name='weight' value={input.weight} onChange={e => handleChanges(e)} required />
                        <h4>{input.weight} Kgs</h4>
                    </div>
                    <div className="input-image">
                        <label htmlFor="image">Image</label>
                        <input type='text' id="image" name='image' value={input.image} onChange={e => handleChanges(e)} />
                    </div>
                    <div className="input-HP">
                        <label htmlFor="HP">HP</label>
                        <input min="1" max="300" type='range' id="HP" name='hp' value={input.hp}
                            onChange={e => handleChanges(e)} required className="range-style" />
                        <h4>{input.hp} HP</h4>
                    </div>
                    <div className="input-attack">
                        <label htmlFor="attack">Attack</label>
                        <input min="1" max="200" type='range' id="attack" name='attack' value={input.attack} onChange={e => handleChanges(e)} required className="range-style" />
                        <h4>{input.attack} pts</h4>
                    </div>
                    <div className="input-defense">
                        <label htmlFor="defense">Defense</label>
                        <input min="1" max="200" type='range' id="defense" name='defense' value={input.defense} onChange={e => handleChanges(e)} required className="range-style" />
                        <h4>{input.defense} pts</h4>
                    </div>
                    <div className="input-speed">
                        <label htmlFor="speed">Speed</label>
                        <input min="1" max="200" type='range' id="speed" name='speed' value={input.speed} onChange={e => handleChanges(e)} required className="range-style" />
                        <h4>{input.speed} pts</h4>
                    </div>

                    <fieldset className="input-types">
                        <legend>Select the types</legend>
                        {types?.map((el, index) => <label key={index} htmlFor={el.id} className={`check${index}`}><input key={index} type='checkbox' id={el.id} value={el.name} onChange={(e) => { handleCheck(e) }} />{el.name}</label>
                        )}
                        {error.types && <p className="error">{error.types}</p>}
                    </fieldset>
                    <input className={activeButton ? 'submit-button' : 'disable'} type="submit" value="Create" />
                </form>
            </div>
            <div className="buttons">
                <Link to={'/home'}><button className="backButton">Back to home</button></Link>
            </div>
        </div>
    )
}