import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Navbar.css'

function Navbar() {

    const navigate = useNavigate();

    function toLogin(e) {
        e.preventDefault()
        navigate('/gate')
    }

    function toSignUp(e) {
        e.preventDefault()
        navigate('/gate/signup')
    }
    return (
        <header>
            <nav>
                <h1 className="title">QwikReview</h1>
                <ul className="Navul">
                    <li className="Navli signup"><button onClick={toSignUp} className="navbutton">SIGN UP</button></li>
                    <li className="Navli login"><button onClick={toLogin} className="navbutton">LOGIN</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;