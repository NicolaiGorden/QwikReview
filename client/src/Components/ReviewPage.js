import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext, LoginContext } from '../App';

function ReviewPage() {

    const [games, setGames] = useContext(GamesContext)
    const [user, setUser] = useContext(LoginContext)

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
        </div>
        <div className='Reviews'>
        </div>
    </div>
    )
}

export default ReviewPage