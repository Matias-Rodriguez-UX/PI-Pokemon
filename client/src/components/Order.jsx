import React from "react"
import './Ordering.css'


export default function Order({ handleOrderAlph, handleOrderByAttack }) {
    return (
        <div className="order">
            <h3>Order</h3>
            <div className="custom-select">
                <select placeholder="Order alphabetically" name="orderAlph" id="name" onChange={(e) => (handleOrderAlph(e))}>
                    <option value="" disabled selected hidden> by name</option>
                    <option value="a">A to Z</option>
                    <option value="z">Z to A</option>
                </select>
                <select placeholder="Order by attack" name="atack" id="attack" onChange={(e) => (handleOrderByAttack(e))}>
                    <option value="" disabled selected hidden> by attack</option>
                    <option value="high">Higher Atack</option>
                    <option value="low">Lower Atack</option>
                </select>
            </div>
        </div>

    )
}