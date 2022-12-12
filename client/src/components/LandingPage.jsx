import React from "react";
import { Link } from 'react-router-dom';

export function LandingPage() {
    return (
        <div>
            <h1>Welcome to Pokedex</h1>
            <Link to='/home'>
                <button>Go!</button>
            </Link>
        </div>
    )

}
