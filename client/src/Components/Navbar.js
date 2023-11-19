import React, { useState, useEffect } from 'react';
import styles from '../Styles/Navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <h1 className="title">QwikReview</h1>
                <ul className="Navul">
                    <li className="Navli signup"><button className="navbutton">SIGN UP</button></li>
                    <li className="Navli login"><button className="navbutton">LOGIN</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;