import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoginContext, UsersContext } from '../App';
import styles from '../Styles/Gate.css'

function Gate() {
    const [signUp, setSignup] = useState(false)
    const [user, setUser] = useContext(LoginContext)
    const [users, setUsers] = useContext(UsersContext)
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const { mode } = useParams()

  
    function signUpToggle(e) {
        e.preventDefault()
        setSignup(!signUp)
        setUsernameError('')
        setPasswordError('')
        setPasswordConfirmationError('')
        setUsername('')
        setPassword('')
        setPasswordConfirmation('')
    }

    useEffect(e => {
        if (user) {
            navigate('/')
        }
        if (mode === 'signup') {
            setSignup(true)
        }
    }, [user])

    function onLoginSubmit(e) {
        e.preventDefault()
        login()
    }

    function login() {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                username,
                password
            }),
        })
        .then((res) => {
            if(res.ok){
                res.json().then((user) => {
                    setUser(user)
                    let allUsers = users
                    allUsers.push(user)
                    setUsers(allUsers)
                    navigate('/')
                    setUsernameError('')
                    setPasswordError('')
                    setPasswordConfirmationError('')
                    setUsername('')
                    setPassword('')
                    setPasswordConfirmation('')
                })
            } else {
                res.json().then((err) => {
                    setPasswordError([err.error.login])
                })
            }
        })
    }

    function onSignupSubmit(e) {
        e.preventDefault()
        setUsernameError('')
        setPasswordError('')
        setPasswordConfirmationError('')
        const userCreds = {
            username,
            password,
            password_confirmation: passwordConfirmation,
        }
        fetch('/users', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(userCreds)
        })
        .then(res => {
            if(res.ok){
                res.json().then(
                    login()
                )
            } else {
                res.json().then((err) => {
                    err.errors.map(e => {
                        switch (e) {
                            case "Username can't be blank":
                                setUsernameError('Required')
                                break;
                            case 'Username is too short (minimum is 5 characters)':
                                setUsernameError('Too short (min: 5 characters)')
                                break;
                            case 'Username already belongs to another user!':
                                setUsernameError('Already exists')
                            case "Password can't be blank":
                                setPasswordError('Required')
                                break;
                            case 'Password must contain an uppercase character!':
                                setPasswordError('No uppercase character!')
                                break;   
                            case "Password confirmation doesn't match Password":
                                setPasswordConfirmationError("Doesn't match password")
                                break;
                        }
                    })
                })
            }
        })
    }

    return (
        <div className="Signup-Form-Box" onSubmit={signUp ? onSignupSubmit : onLoginSubmit}>
            <form className="Signup-Form">
                <h1 className="Gate-Title">QwikReview</h1>
                <hr className='Gate-Divider'/>
                <label className='Signup-Label'>Username</label>
                <input
                    className={usernameError ? 'Input-Error': 'Gate-Input'}
                    placeholder="Your Username"
                    type="Text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="Error-Msg">{usernameError ? usernameError : null}</div>
                <label className='Signup-Label'>Password</label>
                <input
                    className={passwordError ? 'Input-Error': 'Gate-Input'}
                    placeholder="Choose Password"
                    type="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="Error-Msg">{passwordError ? passwordError : null}</div>
                { signUp ?
                <>
                    <label className='Signup-Label'>Confirm Password</label>
                    <input
                        className={passwordConfirmationError ? 'Input-Error': 'Gate-Input'}
                        placeholder=""
                        type="Password"
                        id="passwordconfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <div className="Error-Msg">{passwordConfirmationError ? passwordConfirmationError : null}</div>
                    <div className="Rule-msg">{'-Password must contain an uppercase character'}</div>
                </>
                :
                null
                }
                <button 
                    className="Entry-Button"
                    type="submit"
                > 
                    { signUp ? 'SIGN UP' : 'LOG IN' } 
                </button>
                <div>
                    <ul className="Gateul">
                        <li className="Mode-Swap">
                            { signUp ? 'Have an account?' : 'To make an account, ' } 
                            <button onClick={signUpToggle}className="Swap-Button">
                            { signUp ? 'Log in' : 'Sign up' } 
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>

    )
}

export default Gate;