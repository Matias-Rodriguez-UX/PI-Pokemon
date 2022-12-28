import React from "react"


export default function Order({ handleOrderAlph, handleOrderByAttack }) {
    return (
        <div>
            <select placeholder="Order alphabetically" name="orderAlph" id="" onChange={(e) => (handleOrderAlph(e))}>
                <option value="a">A to Z</option>
                <option value="z">Z to A</option>
            </select>
            <select placeholder="Order by attack" name="atack" id="" onChange={(e) => (handleOrderByAttack(e))}>
                <option value="high">Higher Atack</option>
                <option value="low">Lower Atack</option>
            </select>
        </div>
    )
}