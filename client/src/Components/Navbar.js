import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <h1 className="title">QwikReview</h1>
                <ul>
                    <li className="signup"><button>SIGN UP</button></li>
                    <li><button>LOGIN</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;