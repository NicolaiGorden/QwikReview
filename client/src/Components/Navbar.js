import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import styles from '../Styles/Navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const [user, setUser] = useContext(LoginContext)

    function toLogin(e) {
        e.preventDefault()
        navigate('/gate')
    }

    function toSignUp(e) {
        e.preventDefault()
        navigate('/gate/signup')
    }

    function onLogout(e) {
        e.preventDefault();
        fetch("/logout", {
            method: "DELETE",
        }).then(setUser(''))
        navigate('/gate')
    }
    return (
        <header>
            <nav>
                <h1 className="title">QwikReview</h1>
                <ul className="Navul">
                    { user ?
                        <>
                            <li className="Navli login"><button onClick={onLogout} className="navbutton">LOG OUT</button></li>   
                        </>                 
                    :
                        <>
                            <li className="Navli signup"><button onClick={toSignUp} className="navbutton">SIGN UP</button></li>
                            <li className="Navli login"><button onClick={toLogin} className="navbutton">LOG IN</button></li>   
                        </>      
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;