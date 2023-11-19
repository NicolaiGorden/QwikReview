import React, { useState, useEffect } from 'react';
import styles from '../Styles/GameWidget.css'

function GameWidget() {
    return (
        <div onClick={console.log('ongameclick')}class="game-widget">
                <div class="title-card">    
                    <div class="title-text">Minecraft</div>
                </div>
            <img class="library-img" src='https://www.giantbomb.com/a/uploads/original/8/87790/3020660-box_mc.png' alt='minecraft'/>
        </div>
    )
}

export default GameWidget;