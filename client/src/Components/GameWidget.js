import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/GameWidget.css'

function GameWidget({id, guid, art, name}) {

    const navigate = useNavigate();


    function clickGame(e) {
        e.preventDefault()
        navigate(`/game/${id}`)
    }

    return (
        <div onClick={clickGame}class="game-widget">
            <div className="title-card">    
                <div className="title-text">{name}</div>
            </div>
            <img className="library-img" src={art} alt={name}/>
        </div>
    )
}

export default GameWidget;