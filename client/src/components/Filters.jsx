import React from "react"

export function Filters() {
    return (
        <div>
            <select name="order" id="">
                <option value="a">A to Z</option>
                <option value="z">Z to A</option>
                <option value="high">Higher Atack</option>
                <option value="low">Lower Atack</option>
            </select>
            <select name="filterType" id="">
                <option value="all">All</option>
                <option value="fire">fire</option>
            </select>
            <select name="origin" id="">
                <option value="all">All</option>
                <option value="api">From Api</option>
                <option value="db">From DataBase</option>
            </select>
        </div>
    )
}