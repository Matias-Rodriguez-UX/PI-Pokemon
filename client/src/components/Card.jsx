import React from "react";

export default function Card({ name, image, types, id }) {
    return (
        <div>
            <img src={image} alt="`pokemon" width={"200px"} height={"250px"} />
            <h3>{name}</h3>
        </div>
    )
}