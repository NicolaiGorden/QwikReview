import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext, LoginContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Review from './Review';
import styles from '../Styles/GamePage.css'

function GamePage() {

    const [games, setGames] = useContext(GamesContext)
    const [user, setUser] = useContext(LoginContext)

    const [game, setGame] = useState('')
    const [owned, setOwned] = useState(false)

    const { id } = useParams()

    const navigate = useNavigate();
    

    useEffect(() => {
        setGame(games.find(e => e.id == id))
    }, [games, game])

    useEffect(() => {
        if (user?.reviews?.find(e => e.guid == game.guid)) {
            setOwned(true)
        }
    }, [game])

    function toLogin(e) {
        e.preventDefault()
        navigate(`/gate`)
    }

    function handleNewReview(e) {
        e.preventDefault()
        navigate(`/review/${id}`)
    }

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
                {user ?
                    <button 
                        className="New-Review-Button"
                        onClick={handleNewReview}
                    >
                        {owned ? 'EDIT REVIEW' : '+ NEW REVIEW'}
                    </button>
                :
                    <ul className="Gameul">
                        <li className="Game-Login">
                            To leave a review,
                            <button onClick={toLogin} className="Game-Login-Button">
                                Log in
                            </button>
                        </li>
                    </ul>
                }
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