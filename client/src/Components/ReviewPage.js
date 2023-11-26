import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext, LoginContext } from '../App';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md"
import styles from '../Styles/ReviewPage.css'

function ReviewPage() {

    const [games, setGames] = useContext(GamesContext)
    const [user, setUser] = useContext(LoginContext)
    const [game, setGame] = useState('')
    const [owned, setOwned] = useState(false)
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [score, setScore] = useState(1)

    const [searchFocus, setSearchFocus] = useState(false)
    
    const [error, setError] = useState('')

    const [titleError, setTitleError] = useState('')
    const [bodyError, setBodyError] = useState('')

    const { id } = useParams()

    useEffect(() => {
        setGame(games.find(e => e.id == id))
    }, [games, game])
    
    useEffect(() => {
        if (user?.reviews?.find(e => e.guid == game?.guid)) {
            const myReview = user?.reviews?.find(e => e.guid == game.guid)
            setOwned(true)
            setTitleInput(myReview.title)
            setReviewBody(myReview.body)
            setScore(myReview.score)
        }
    }, [game])

    function handleSearchChange(value) {
        setSearchInput(value)
    }

    function handleTitleChange(value) {
        setTitleInput(value)
    }

    function handleReviewChange(value) {
        setReviewBody(value)
    }

    function handleUpClick(e) {
        e.preventDefault()
        if (score < 10) {
            setScore(score + 1)
        }
    }

    function handleDownClick(e) {
        e.preventDefault()
        if (score > 1) {
            setScore(score - 1)
        }
    }

    function handleReviewSubmit(e) {
        e.preventDefault()
        setTitleError('')
        setBodyError('')
        fetch('/reviews', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleInput,
                body: reviewBody,
                score,
                game_id: game?.id
            })
        })
        .then(res => {
            if (res.ok){
                res.json().then((review) => {
                    console.log(`Review Made: ${review}`)
                    let allGames = games
                    const gameIndex = allGames.findIndex((g) => g.id === game.id)
                    allGames[gameIndex].reviews.push(review)

                    let scores = (allGames[gameIndex]?.reviews?.map((r) => r.score))
                    const newAverage = (scores?.reduce(function (avg, value, _, { length }) {
                        return avg + value / length;
                    }, 0))

                    allGames[gameIndex].average_score = newAverage

                    setGames(allGames)

                    

                    let me = user
                    me.reviews.push(review)
                    setUser(me)
                    
                    navigate(`/game/${game.id}`)
                })
            } else {
                res.json().then((err) => {
                    if (err.errors) {
                        err.errors.map(e => {
                            switch (e) {
                                case "Title can't be blank":
                                    setTitleError('Required')
                                    break;
                                case "Body can't be blank":
                                    setBodyError('Required')
                                    break;
                                case "Body is too long (maximum is 280 characters)":
                                    setBodyError('Too long! (max 280 bytes)')
                                    break;
                                case 'User already reviewed!':
                                    setBodyError("You've already reviewed. If you're viewing this message, reload the page.")
                                    break;
                                case 'Not Authorized':
                                    setBodyError("Not logged in!")
                                    break;
                            }
                        })
                    } else if (err.error === 'Not Authorized') {
                        setBodyError('You must be logged in to post a review.')
                    }
                })
            }
        })
    }

    return (
        <div className="Review-Game-Wrapper">
        <div className='Review-Info'>
            <h1 className={game?.name?.length > 25 ? 'Game-Name-Small' : 'Game-Name'}>{game?.name}</h1>
            { game 
                ?
                <div className="Game-Big">
                    <img className="Game-Big-Img" src={game?.art} alt={game?.name}/>
                </div>

            :
                <div className="">
                    Search for a game to review.
                </div>
            }
        </div>
        <div className='Review-Form-Body'>

                <label className ="Review-Label">Search for a game:</label> 
                <div className = {searchFocus ? "Game-Search-Input-Focus" : "Game-Search-Space"}>
                <FaMagnifyingGlass size='1.2em'id="search-icon"/>
                    <input
                        className = "Game-Search-Input"
                        placeholder = "Search for games..."
                        value = {searchInput}
                        onChange = {(e) => handleSearchChange(e.target.value)}
                        onFocus = {(e) => setSearchFocus(true)}
                        onBlur = {(e) => setSearchFocus(false)}
                    />
                </div>

                <form className='Review-Form' onSubmit={handleReviewSubmit}>
                    <label className="Review-Label">Name your review:</label> 
                    <input
                        className = {titleError ? "Game-Title-Input-Error": "Game-Title-Input"}
                        placeholder= "My Review"
                        value = {titleInput}
                        onChange = {(e) => handleTitleChange(e.target.value)}
                    />
                    <div className="Review-Error-Msg">{titleError ? titleError : null}</div>

                    <label className="Review-Label">Review:</label>
                    <textarea 
                        className={bodyError ? 'Body-Input-Error': 'Body-Input'}
                        placeholder= {`Thoughts on ${game?.name}? (280 chars max.)`}
                        value={reviewBody}
                        onChange={(e) => handleReviewChange(e.target.value)}
                    />
                    <div className="Review-Error-Msg">{bodyError ? bodyError : null}</div>

                    <div className="Score-Button">
                        <div className="Review-Score-Space">
                            <label className="Score-Label">Score:</label>
                            <div className= "Score-Select">{score}</div>
                        </div>
                        <div className="Arrows">
                            <button className="Up" onClick={handleUpClick}>
                                <MdOutlineArrowDropUp size='1.5em'/>
                            </button>
                            <div className="Divider"/>
                            <button className="Down" onClick={handleDownClick}>
                                <MdOutlineArrowDropDown size='1.5em'/>    
                            </button>
                        </div>

                        <button type="submit" class="Post-Review-Button">{owned ? 'Update Review' : 'Post Review'}</button>
                    </div>
                </form>
        </div>
    </div>
    )
}

export default ReviewPage