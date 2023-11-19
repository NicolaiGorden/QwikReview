import React, { useState, useEffect } from 'react';
import styles from '../Styles/GameWidget.css'

function GameWidget({guid, art, name}) {
    return (
        <div onClick={console.log('ongameclick')}class="game-widget">
                <div class="title-card">    
                    <div class="title-text">{name}</div>
                </div>
            <img class="library-img" src={art} alt={name}/>
        </div>
    )
}

export default GameWidget;