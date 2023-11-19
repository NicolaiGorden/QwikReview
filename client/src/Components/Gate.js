import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Styles/Gate.css'

function Gate() {
    const [signUp, setSignup] = useState(false)
    const [errors, setErrors] = useState(['err', 'err2'])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const { mode } = useParams()
    
    function signUpToggle(e) {
        e.preventDefault()
        setSignup(!signUp)
    }

    useEffect(e => {
        if (mode === 'signup') {
            setSignup(true)
        }
    }, [])

    function onLoginSubmit(e) {
        e.preventDefault()
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
                res.json().then((user) => console.log(user))
            } else {
                res.json().then((err) => {
                    setErrors([err.error.login])
                })
            }
        })
    }

    return (
        <div className="Signup-Form-Box" onSubmit={onLoginSubmit}>
            <form className="Signup-Form">
                <h1 className="Gate-Title">QwikReview</h1>
                <hr className='Gate-Divider'/>
                <label className='Signup-Label'>Username</label>
                <input
                    className={errors[0] ? 'Input-Error': 'Gate-Input'}
                    placeholder="Your Username"
                    type="Text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="Error-Msg"></div>
                <label className='Signup-Label'>Password</label>
                <input
                    className={errors[0] ? 'Input-Error': 'Gate-Input'}
                    placeholder="Choose Password"
                    type="Password"
                    id="username"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="Error-Msg">{!signUp ? errors.join(', ') : null}</div>
                { signUp ?
                <>
                    <label className='Signup-Label'>Confirm Password</label>
                    <input
                        className={errors[0] ? 'Input-Error': 'Gate-Input'}
                        placeholder=""
                        type="Password"
                        id="username"
                    />
                    <div className="Error-Msg">{signUp ? errors.join(', ') : null}</div>
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