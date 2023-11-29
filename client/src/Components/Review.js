import React, { useState, useEffect, useContext } from 'react';
import { LoginContext, GamesContext, UsersContext } from '../App';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Review.css'

function Review({username, userImage, title, body, score, guid, onReviewDelete}) {

    const [user, setUser] = useContext(LoginContext)
    const [deleteMode, setDeleteMode] = useState(false)
    const [games, setGames] = useContext(GamesContext)
    const [users, setUsers] = useContext(UsersContext)
    const [profileImage, setProfileImage] = useState('')
    const [game, setGame] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        setGame(games.find((e => e.guid == guid)))
    }, [guid])

    useEffect(() => {
        if (users) {
            setProfileImage(users?.find((user) => user.username == username)?.profile?.avatar)
        }
    })
    
    function deleteToggle() {
        setDeleteMode(!deleteMode)
    }

    function handleUsernameClick() {
        navigate(`/users/${users?.find((user) => user.username == username).id}`)
    }

    function handleGameClick() {
        navigate(`/game/${game.id}`)
    }

    return (
        <div className={username === user.username ? 'Review-Mine' : 'Review'}>
            <div className='Title-User'>
                <div className="Name-Trash-Container">
                    <div className='Review-Title'>{title}</div>
                    {username === user.username && onReviewDelete ?
                        <>
                            <div className={ !deleteMode ? 'Trash' : 'Trash-On' } onClick={deleteToggle}>
                                <FaTrashAlt />
                            </div>
                            <button onClick={onReviewDelete} className= { !deleteMode ? 'Delete-Button Delete-Off' : 'Delete-Button' }>
                                DELETE REVIEW
                            </button>
                        </>
                        :
                        null
                    }
                </div>
                <div className='Review-Header'>
                    { onReviewDelete ? 
                        <>
                            { profileImage ?
                                <div 
                                    onClick={handleUsernameClick}
                                    className='Review-User-Img'
                                    style={{backgroundImage: `url(${profileImage})`}}
                                ></div>
                            :
                                <div 
                                    onClick={handleUsernameClick}
                                    className='Review-User-Img'
                                    style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')"}}
                                ></div>
                            }
                            <div className='Review-Username' onClick={handleUsernameClick}>{username}</div>
                        </>
                    :
                        <div className='Review-Username' onClick={handleGameClick}>{game?.name}</div>
                    }
                </div>
            </div>
            <div className='Content'>
                <div className='Text-Space'>
                    <div className='Text'>
                        {body}
                    </div>
                </div>
                <div className='Score-Space'>
                    <div className= 'Score'>{score}/10</div>
                </div>
            </div>
        </div>
    )
}

export default Review;