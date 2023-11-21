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
    }, [games, game])

    return (
        <div className="Game-Wrapper">
            <div className='Info'>
                <h1 className={game?.name?.length > 25 ? 'Game-Name-Small' : 'Game-Name'}>{game?.name}</h1>
                <div className="Game-Big">
                    <img className="Game-Big-Img" src={game?.art} alt={game?.name}/>
                </div>
                <div className='Average-Score-Space'>
                    <div>{game?.average_score ? 'User Rating:' : 'Not yet rated!'}</div>
                    {game?.average_score ? <div className='Average-Score'>{game?.average_score}/10</div> : null}
                </div>
            </div>
            <div className='Reviews'>
                {game?.reviews?.map(e => {
                    return (
                        <Review
                            key= {e.id}
                            title= {e.title}
                            body= {e.body} 
                            score= {e.score}
                            username= {e.username}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GamePage;