import React, { useState, useEffect, useContext } from 'react';
import { LoginContext, GamesContext, UsersContext } from '../App';
import { useParams } from 'react-router-dom';
import Review from './Review';
import styles from '../Styles/UsersPage.css'

function UsersPage() {

    const [user, setUser] = useContext(LoginContext)
    const [games, setGames] = useContext(GamesContext)
    const [users, setUsers] = useContext(UsersContext)

    const [profileEdit, setProfileEdit] = useState(false)

    const [imageData, setImageData] = useState(null)
    const [image, setImage] = useState(null)
    const [bio, setBio] = useState('')

    const [imageErrorOne, setImageErrorOne] = useState('')
    const [imageErrorTwo, setImageErrorTwo] = useState('')
    const [bioError, setBioError] = useState('')

    const [reviews, setReviews] = useState([])
    const [thisUser, setThisUser] = useState('')
    const { id } = useParams()

    useEffect(() => {
        setThisUser(users.find(e => e.id == id))
        setBio(thisUser?.profile?.bio)
        setImage(thisUser?.profile?.avatar)
    }, [users, thisUser])

    useEffect(() => {
        setReviews(thisUser?.reviews)
    }, [thisUser])

    function editMode(e) {
        e.preventDefault()
        setProfileEdit(true)
    }

    function handleBioChange(value) {
        setBio(value)
    }

    function handleProfileUpdate(e) {
        e.preventDefault()
        const formData = new  FormData()
        if (imageData) {
            formData.append('avatar', imageData)
        }
        if (bio) {
            formData.append('bio', bio)
        } else {
            formData.append('bio', '')
        }
        fetch(`/profiles/${id}`, {
            method:'PATCH',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                res.json().then((profile) => {
                    console.log(profile)
                    let allUsers = users
                    let userIndex = allUsers.findIndex((user) => user.id === thisUser.id)
                    allUsers[userIndex].profile.bio = profile.bio
                    allUsers[userIndex].profile.avatar = profile.avatar
                    setUsers(allUsers)

                    let me = user
                    user.profile.bio = profile.bio
                    user.profile.avatar = profile.avatar
                    setUser(me)

                    setImage(profile.avatar)
                    setProfileEdit(false)
                })
            } else {
                res.json().then((err) => {
                    console.log(err.errors)
                    err.errors?.map(e => {
                        switch (e) {
                            case 'Bio is too long (maximum is 300 characters)':
                                setBioError('Too long! (max 300 bytes)')
                                break;
                            case 'Avatar is too large':
                                setImageErrorOne('File too large. (max 3 megabytes)')
                                break;
                            case 'Avatar must be jpeg/png':
                                setImageErrorTwo('File must be a jpeg or png.')
                                break;
                        }
                    })
                })
            }
        })
    }

    return (
        <div className="User-Page-Wrapper">
            <div className='User-Info'>
                <div className='User-Reviews-Label'>{thisUser?.username}</div>
                {image ?
                    <div 
                        className='User-Img'
                        style={{backgroundImage: `url(${image})`}}
                    ></div>
                :
                    <div 
                        className='User-Img'
                        style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')"}}
                    ></div>
                }   
                { profileEdit ?
                    <>
                        <label className= 'Bio-Div-Label'>Profile Image:</label>
                        <input className= 'Upload-Image' type='file' accept='image/*' onChange={(e) => setImageData(e.target.files[0])}/>
                        <div className="User-Error-Msg">{imageErrorOne ? imageErrorOne : null}</div>
                        <div className="User-Error-Msg">{imageErrorTwo ? imageErrorTwo : null}</div>
                        <label className= 'Bio-Div-Label'>Bio:</label>
                        <textarea 
                            className={'Bio-Div'}
                            placeholder= {'Your bio here.'}
                            value={bio}
                            onChange={(e) => handleBioChange(e.target.value)}
                        />
                        <div className="User-Error-Msg">{bioError ? bioError : null}</div>
                        <button onClick={handleProfileUpdate} className="Edit-Profile-Button">Finish Editing</button>
                    </>
                :
                    <>
                        <label className= 'Bio-Div-Label'>Bio:</label>
                        <div className='Bio-Div'>{bio ? bio : 'This user has not written a bio.'}</div>
                        { user?.id === thisUser?.id ? 
                            <button onClick={editMode} className="Edit-Profile-Button">Edit Profile</button>
                            :
                            null
                        }
                    </>
                }
            </div>
            <div className= 'User-Reveiew-Box'>
                <div className= 'User-Reviews-Label'>Reviews</div>
                <div className='User-Reviews'>
                    {reviews?.map(e => {
                        return (
                            <Review
                                key= {e.id}
                                title= {e.title}
                                body= {e.body} 
                                score= {e.score}
                                username= {e.username}
                                guid= {e.guid}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UsersPage