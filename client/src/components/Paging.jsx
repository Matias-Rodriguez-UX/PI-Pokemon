import React from "react";


export default function Paging({ pokemonsPerPage, allPokemons, paging }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {pageNumbers?.map((number, index) => (
                    <li key={index}>
                        <a onClick={() => paging(number)} key={index}>
                            {number}
                        </a>
                    </li>

                ))}
            </ul>
        </nav>
    )
}