import React from "react";

export default function Card({ name, image, types, id }) {
    const urlImgDefault = 'https://play-lh.googleusercontent.com/wAWerkEu_g2_BMCl85WKqN2mxn0xW1O22nV6yJOayrMKu9pqtrLMn7S2Zd1xaykKm0g'
    return (
        <div>
            <img src={image ? image : urlImgDefault} alt="pokemon" width={"200px"} height={"250px"} />
            <h3>{name}</h3>
            {types && <ul>
                {types?.map((el, index) =>
                    <li key={index}>
                        {el}
                    </li>)}
            </ul>}

        </div>
    )
}