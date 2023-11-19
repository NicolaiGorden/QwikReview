import React, { useState, useEffect, useContext } from 'react';
import GameWidget from './GameWidget';
import { GamesContext } from '../App';
import styles from '../Styles/Library.css'

function Library() {

    const [games, setGames] = useContext(GamesContext)

    return (
        <div className="LibraryWrapper">
            <div className="Library">
                {games.map(e => {
                    return (
                        <GameWidget
                            guid={e.guid}
                            name={e.name}
                            art={e.art}
                        />
                    )
                })}
            </div>
            <div className="Sidebar">
                
            </div>
        </div>
    )
}

export default Library;