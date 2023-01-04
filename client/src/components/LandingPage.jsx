import React from "react";
import { Link } from 'react-router-dom';

let pokeball = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png'
export function LandingPage() {
    return (
        <div>
            <Link to='/home'>
                <img src={pokeball} alt="go" width='27%' height='27%'
                    style={{
                        marginBottom: "3rem"
                    }} />
            </Link>
        </div>
    )

}
