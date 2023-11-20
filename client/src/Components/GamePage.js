import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '../App';
import Review from './Review';
import styles from '../Styles/GamePage.css'

function GamePage() {

    const [games, setGames] = useContext(GamesContext)

    const [game, setGame] = useState('')

    const { id } = useParams()

    useEffect(() => {
        setGame(games.find(e => e.id == id))
    }, [games])

    return (
        <div className="Game-Wrapper">
            <div className='Info'>
                <h1 className='Game-Name'>{game?.name}</h1>
                <div className="Game-Big">
                    <img className="Game-Big-Img" src={game?.art} alt={game?.name}/>
                </div>
            </div>
            <div className='Reviews'>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
            </div>
        </div>
    )
}

export default GamePage;