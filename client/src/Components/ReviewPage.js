import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext, LoginContext, UsersContext } from '../App';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md"
import fetchJsonp from 'fetch-jsonp'
import styles from '../Styles/ReviewPage.css'

function ReviewPage() {

    const [games, setGames] = useContext(GamesContext)
    const [user, setUser] = useContext(LoginContext)
    const [users, setUsers] = useContext(UsersContext)
    const [game, setGame] = useState('')
    const [owned, setOwned] = useState(false)
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [currentGUID, setCurrentGUID] = useState('')
    const [newGame, setNewGame] = useState(false)

    const [titleInput, setTitleInput] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [score, setScore] = useState(1)

    const [searchFocus, setSearchFocus] = useState(false)

    const [titleError, setTitleError] = useState('')
    const [bodyError, setBodyError] = useState('')
    const [searchError, setSearchError] = useState('')

    const [searchSpaceStyle, setSearchSpaceStyle] = useState("Game-Search-Space")

    const { id } = useParams()
    const [idRef, setIdRef] = useState(id)
    const [newGameId, setNewGameId] = useState(id)

    useEffect(() => {
        if (idRef) {
            setGame(games.find(e => e.id == idRef))
        }
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

    useEffect(() => {
        if (games.find(e => e.guid == currentGUID)) {
            setGame(games.find(e => e.guid == currentGUID))
            setNewGame(false)
        } else if (currentGUID) {
            fetchJsonp(
                `https://www.giantbomb.com/api/game/${currentGUID}/?api_key=96b1a2f459df7597812987b460af056962057bd6&format=jsonp&field_list=image,guid,name`,
                {jsonpCallback: 'json_callback'},
            ).then(res => {
                if(res.ok) {
                    res.json().then(data => {
                        let newGame = {
                            guid: data.results.guid,
                            art: data.results.image.original_url,
                            name: data.results.name,
                        }
                        setGame(newGame)
                        setNewGame(true)
                    })
                }
            })
            setOwned(false)  
        }
    }, [currentGUID])

    useEffect(() => {
        fetchJsonp(
            `https://www.giantbomb.com/api/search/?api_key=96b1a2f459df7597812987b460af056962057bd6&format=jsonp&field_list=guid,name&resources=game&query="${searchInput}"`,
            {jsonpCallback: 'json_callback'},
        ).then(res => {
            if(res.ok) {
                res.json().then(data => {
                    setSearchResults(data.results)
                })
            }
        })
    }, [searchInput])

    function handleSearchChange(value) {
        setSearchError(false)
        setSearchSpaceStyle("Game-Search-Space")
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
        if (!owned) {
            if (newGame) {
                fetch('/games', {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(game)
                })
                .then(res => {
                    if(res.ok){
                        res.json().then((newG) => {
                            console.log('new:', newG)
                            setNewGameId(newG.id)
                            setNewGame(false)
                            let allGames = [...games]
                            allGames.push(newG)
                            setGames(allGames)
                            fetch('/reviews', {
                                method:"POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    title: titleInput,
                                    body: reviewBody,
                                    score,
                                    game_id: newG.id
                                })
                            })
                            .then(res => {
                                if (res.ok){
                                    res.json().then((review) => {
                                    const gameIndex = allGames.findIndex((game) => game.id === newG.id)
                                    allGames[gameIndex].reviews.push(review)
        
                                    let scores = (allGames[gameIndex]?.reviews?.map((r) => r.score))
                                    const newAverage = (scores?.reduce(function (avg, value, _, { length }) {
                                        return avg + value / length;
                                    }, 0))
        
                                    allGames[gameIndex].average_score = newAverage
        
                                    setGames(allGames)

                                    let allUsers = users
                                    let userIndex = allUsers.findIndex((u) => u.id === user.id)
                                    allUsers[userIndex].reviews.push(review)
                                    setUsers(allUsers)

                                    let me = user
                                    me.reviews.push(review)
                                    setUser(me)
                                    
                                    navigate(`/game/${newG.id}`)
                                    })
                                } else {
                                    res.json().then((err) => {
                                        fetch(`/games/${newG.id}`, {
                                            method: "DELETE",
                                        })
                                        .then( res => {
                                            if (res.ok) {
                                                const gameIndex = allGames.findIndex((game) => game.id === newG.id)
                                                if (gameIndex > -1) {
                                                    allGames.splice(gameIndex, 1)
                                                }
                                                setGames(allGames)
                                                setNewGame(true)
                                            }
                                        })
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
                                                    case "Game must exist":
                                                        setSearchError("Please find a game!")
                                                        setSearchSpaceStyle("Game-Search-Space-Error")
                                                        break;
                                                    case 'Title is too short (minimum is 5 characters)':
                                                        setTitleError('Too short! (minimum 5 characters)')
                                                        break;
                                                    case 'Body is too short (minimum is 20 characters)':
                                                            setBodyError('Too short! (minimum 20 characters)')
                                                        break;
                                                }
                                            })
                                            if (err.errors.includes("Title can't be blank")) {
                                                setTitleError('Required')
                                            }
                                            if (err.errors.includes("Body can't be blank")) {
                                                setBodyError('Required')
                                            }
                                        } else if (err.error === 'Not Authorized') {
                                            setBodyError('You must be logged in to post a review.')
                                        }
                                    })
                                }
                            })
                        })
                    } else {
                        res.json().then( (err) => {console.log(err)} )
                    }
                }) 
            } else {
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
                            let allGames = [...games]
                            const gameIndex = allGames.findIndex((g) => g.id === game.id)
                            allGames[gameIndex].reviews.push(review)

                            let scores = (allGames[gameIndex]?.reviews?.map((r) => r.score))
                            const newAverage = (scores?.reduce(function (avg, value, _, { length }) {
                                return avg + value / length;
                            }, 0))

                            allGames[gameIndex].average_score = newAverage

                            setGames(allGames)

                            let allUsers = users
                            let userIndex = allUsers.findIndex((u) => u.id === user.id)
                            allUsers[userIndex].reviews.push(review)
                            setUsers(allUsers)

                            let me = user
                            me.reviews.push(review)
                            setUser(me)
                            
                            navigate(`/game/${game.id}`)
                        })
                    } else {
                        res.json().then((err) => {
                            console.log(err)
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
                                        case "Game must exist":
                                            setSearchError("Please find a game!")
                                            setSearchSpaceStyle("Game-Search-Space-Error")
                                            break;
                                        case 'Title is too short (minimum is 5 characters)':
                                            setTitleError('Too short! (minimum 5 characters)')
                                            break;
                                        case 'Body is too short (minimum is 20 characters)':
                                             setBodyError('Too short! (minimum 20 characters)')
                                            break;
                                    }
                                })
                                if (err.errors.includes("Title can't be blank")) {
                                    setTitleError('Required')
                                }
                                if (err.errors.includes("Body can't be blank")) {
                                    setBodyError('Required')
                                }
                            } else if (err.error === 'Not Authorized') {
                                setBodyError('You must be logged in to post a review.')
                            }
                        })
                    }
                })
            }
        } else {
            const myReview = user?.reviews?.find(e => e.guid == game.guid)
            fetch(`/reviews/${myReview.id}`, {
                method:'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    title: titleInput,
                    body: reviewBody,
                    score,
                    game_id: game?.id
                })
            })
            .then (res => {
                if (res.ok) {
                    res.json().then((review) => {
                        let allGames = [...games]
                        const gameIndex = allGames.findIndex((g) => g.id === game.id)
                        const myReview = user?.reviews?.find(e => e.guid == game.guid)
                        const myReviewIndex = (allGames[gameIndex]?.reviews?.findIndex((r) => r.id === myReview.id))
                        allGames[gameIndex].reviews[myReviewIndex] = review

                        let scores = (allGames[gameIndex]?.reviews?.map((r) => r.score))
                        const newAverage = (scores?.reduce(function (avg, value, _, { length }) {
                            return avg + value / length;
                        }, 0))
                        allGames[gameIndex].average_score = newAverage

                        let allUsers = users
                        let userIndex = allUsers.findIndex((u) => u.id === user.id)
                        allUsers[userIndex].reviews.push(review)
                        setUsers(allUsers)

                        let me = user
                        const userReviewIndex = me.reviews.findIndex((r) => r.id === review.id)
                        me.reviews[userReviewIndex] = review
                        setUser(me)
    
                        setGames(allGames)
                        navigate(`/game/${game.id}`)
                    })
                } else {
                    res.json().then((err) => {
                        err.errors?.map(e => {
                            
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
                                case 'Title is too short (minimum is 5 characters)':
                                    setTitleError('Too short! (minimum 5 characters)')
                                    break;
                                case 'Body is too short (minimum is 20 characters)':
                                        setBodyError('Too short! (minimum 20 characters)')
                                    break;
                            }
                        })
                        if (err.errors.includes("Title can't be blank")) {
                            setTitleError('Required')
                        }
                        if (err.errors.includes("Body can't be blank")) {
                            setBodyError('Required')
                        }
                    })
                }
            })
        }
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
                    <div className="No-Game">
                        Search for a game to review.
                    </div>
                }
            </div>
            <div className='Review-Form-Body'>
                        <label className ="Review-Label Search-Label">{!game ? 'Search for a game:' : 'Find a different game:'}</label> 
                        <div className='Dropdown-Grid'>
                            <div className = {searchFocus ? "Game-Search-Space-Focus" : searchSpaceStyle}>
                                <FaMagnifyingGlass size='1.2em'id="search-icon"/>
                                <input
                                    className = "Game-Search-Input"
                                    placeholder = "Search for games..."
                                    value = {searchInput}
                                    onChange = {(e) => {
                                        handleSearchChange(e.target.value)
                                        setSearchFocus(true)
                                    }}
                                    onFocus = {(e) => setSearchFocus(true)}
                                    onBlur = {(e) => setSearchFocus(false)}
                                />
                            </div>

                                <ul className = {searchInput && searchFocus ? "Dropdown" : "Dropdown Gone"}>
                                    {searchResults?.map((game) => {
                                        return (
                                            <li 
                                                guid={game.guid}
                                                onMouseDown= {(e) => {
                                                    e.preventDefault()
                                                    setIdRef('')
                                                    setSearchFocus(false)
                                                    setCurrentGUID(e.target.attributes.guid.value)
                                                    setSearchInput(e.target.outerText)
                                            }}className = "Dropdown-Item">{game.name}</li>
                                        )
                                    })}
                                </ul>

                        </div>
                    <div className="Review-Error-Msg">{searchError ? searchError : null}</div>

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
                            placeholder= {game ? `Thoughts on ${game?.name}? (280 chars max.)` : `My Review (280 chars max.)`}
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

                            <button type="submit" className="Post-Review-Button">{owned ? 'Update Review' : 'Post Review'}</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default ReviewPage