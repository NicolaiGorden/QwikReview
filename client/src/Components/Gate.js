import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Styles/Gate.css'

function Gate() {
    const [signUp, setSignup] = useState(false)
    const [usernameError, setUsernameError] = useState([])
    const [passwordError, setPasswordError] = useState([])
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

    return (
        <div className="Signup-Form-Box">
            <form className="Signup-Form">
                <h1 className="Gate-Title">QwikReview</h1>
                <hr className='Gate-Divider'/>
                <label className='Signup-Label'>Username</label>
                <input
                    className={usernameError[0] ? 'Input-Error': 'Gate-Input'}
                    placeholder="Your Username"
                    type="Text"
                    id="username"
                />
                <div className="Error-Msg">{usernameError.join(', ')}</div>
                <label className='Signup-Label'>Password</label>
                <input
                    className={passwordError[0] ? 'Input-Error': 'Gate-Input'}
                    placeholder="Choose Password"
                    type="Password"
                    id="username"
                />
                <div className="Error-Msg">{passwordError.join(', ')}</div>
                { signUp ?
                <div>
                    <label className='Signup-Label'>Confirm Password</label>
                    <input
                        className={passwordError[0] ? 'Input-Error': 'Gate-Input'}
                        placeholder=""
                        type="Password"
                        id="username"
                    />
                    <div className="Error-Msg">{passwordError.join(', ')}</div>
                </div>
                :
                null
                }
                <button className="Entry-Button"> { signUp ? 'SIGN UP' : 'LOG IN' } </button>
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