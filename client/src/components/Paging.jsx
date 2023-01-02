import React from "react";
import './Paging.css'

export default function Paging({ pokemonsPerPage, allPokemons, paging }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    let val = ''
    function changeActive() {
        val = 'active'
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers?.map((number, index) => (
                    <li key={index}>
                        <a onClick={() => { paging(number); changeActive() }} key={index} href className={val}>
                            {number}
                        </a>
                    </li>

                ))}
            </ul>
        </nav>
    )
}