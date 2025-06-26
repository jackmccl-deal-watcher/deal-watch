import { useNavigate } from 'react-router-dom'
import { signupUser } from '../../utils/ApiUtils'
import { useUser } from '../UserProvider/UserProvider'
import './SignUp.css'
import { useState } from 'react'

const Signup = () => {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {user, setUser} = useUser()

    const handleSignup = async (e) => {
        e.preventDefault()
        const serverResponse = await signupUser({username, password})
        if (serverResponse.status === 'success') {
            setMessage('')
            setUser(serverResponse.username)
            navigate('/')
        } else {
            setMessage(serverResponse.message)
        }
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }


    return(
        <div className='signup'>
            <div className='signup-content'>
                <form className='signup-content-form' onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    <p>Username:</p>
                    <input type='text' name='username' value={username} onChange={updateUsername}></input>
                    <p>Password:</p>
                    <input type='password' name='password' value={password} onChange={updatePassword}></input>
                    <button className='signup-button'>Signup</button>
                    { message ? <p>{message}</p> : null}
                </form>
            </div>
        </div>
    )
}

export default Signup