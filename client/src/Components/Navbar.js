import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import styles from '../Styles/Navbar.css'

function Navbar() {

    const navigate = useNavigate();
    const [user, setUser] = useContext(LoginContext)


    useEffect(() => {

    }, [user])
    
    function toLogin(e) {
        e.preventDefault()
        navigate('/gate')
    }

    function toSignUp(e) {
        e.preventDefault()
        navigate('/gate/signup')
    }

    function toLibrary(e) {
        e.preventDefault()
        navigate('/')
    }

    function toNewReview(e) {
        e.preventDefault()
        navigate('/review')
    }

    function onLogout(e) {
        e.preventDefault();
        fetch("/logout", {
            method: "DELETE",
        }).then(setUser(''))
        navigate('/gate')
    }

    function toUser(e) {
        e.preventDefault();
        navigate(`/users/${user.id}`)
    }

    return (
        <header>
            <nav>
                <h1 className="title" onClick={toLibrary}>QwikReview</h1>
                <ul className="Navul">
                    { user ?
                        <>
                            <li className="Navli signup"><button onClick={toNewReview} className="navbutton">+ NEW REVIEW</button></li>
                            <li className="Navli login"><button onClick={onLogout} className="navbutton">LOG OUT</button></li>
                            <div className="Navbar-Image-Space">
                                <div 
                                        onClick={toUser}
                                        className='Navbar-User-Img'
                                        style={{backgroundImage: `url(${user?.profile?.avatar ? user?.profile?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'})`}}
                                        
                                ></div>
                            </div>
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