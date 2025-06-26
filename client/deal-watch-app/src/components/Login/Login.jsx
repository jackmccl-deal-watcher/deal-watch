import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/ApiUtils'
import { useUser } from '../UserProvider/UserProvider'
import './Login.css'
import { useState } from 'react'

const Login = () => {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {user, setUser} = useUser()

    const handleLogin = async (e) => {
        e.preventDefault()
        const serverResponse = await loginUser({username, password})
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
        <div className='login'>
            <div className='login-content'>
                <form className='login-content-form' onSubmit={handleLogin}>
                    <p>Username:</p>
                    <input type='text' name='username' value={username} onChange={updateUsername}></input>
                    <p>Password:</p>
                    <input type='password' name='password' value={password} onChange={updatePassword}></input>
                    <button className='login-button'>Login</button>
                    { message ? <p>{message}</p> : null}
                </form>
            </div>
        </div>
    )
}

export default Login