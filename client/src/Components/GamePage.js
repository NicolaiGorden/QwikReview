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
    }, [games, game, onReviewDelete])

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
        navigate(`/review/game/${id}`)
    }

    function onReviewDelete(e) {
        e.preventDefault()
        const myReview = user?.reviews?.find(e => e.guid == game.guid)
        fetch(`/reviews/${myReview.id}`, {
            method: "DELETE",
        })
        .then (() => {
            let allGames = [...games]
            const gameIndex = allGames.findIndex((g) => g.id === game.id)
            const myReview = user?.reviews?.find(e => e.guid == game.guid)
            const myReviewIndex = (allGames[gameIndex]?.reviews?.findIndex((r) => r.id === myReview.id))
            if (myReviewIndex > -1) {
                allGames[gameIndex].reviews.splice(myReviewIndex, 1)
            }

            let scores = (allGames[gameIndex]?.reviews?.map((r) => r.score))
            const newAverage = (scores?.reduce(function (avg, value, _, { length }) {
                return avg + value / length;
            }, 0))
            allGames[gameIndex].average_score = newAverage
            setGames(allGames)

            let me = user
            const userReviewIndex = me.reviews.findIndex(e => e.guid == game.guid)
            if (userReviewIndex > -1) {
                me.reviews.splice(userReviewIndex, 1)
            }
            setUser(me)
            setOwned(false)
        })
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
                    {game?.average_score ? <div className='Average-Score'>{Math.round(game?.average_score * 10) / 10}/10</div> : null}
                </div>
                {user ?
                    <button 
                        className="New-Review-Button"
                        onClick={handleNewReview}
                    >
                        {owned ? 'UPDATE REVIEW' : '+ NEW REVIEW'}
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
                            game= {game}
                            onReviewDelete = {onReviewDelete}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GamePage;