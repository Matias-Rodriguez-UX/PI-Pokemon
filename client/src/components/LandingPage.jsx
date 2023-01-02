import React from "react";
import { Link } from 'react-router-dom';

let pokeball = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png'
export function LandingPage() {
    return (
        <div>
            <Link to='/home'>
                <img src={pokeball} alt="go" width='30%' height='30%' />
            </Link>
        </div>
    )

}
