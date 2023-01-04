import React from "react";
import './Paging.css'

export default function Paging({ pokemonsPerPage, allPokemons, paging, page, previousPage, nextPage }) {
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
                <li><a onClick={previousPage} className={page === pageNumbers[0] ? 'desactiveBtn' : null}>{`<<`}Prev</a></li>
                {pageNumbers?.map((number, index) => (
                    <li key={index}>
                        <a onClick={() => { paging(number); changeActive() }} key={index} className={number === page ? 'active' : null}>
                            {number}
                        </a>
                    </li>
                ))}
                <li><a onClick={nextPage} className={page === pageNumbers.length ? 'desactiveBtn' : null}>Next{`>>`}</a></li>
            </ul>
        </nav>
    )
}