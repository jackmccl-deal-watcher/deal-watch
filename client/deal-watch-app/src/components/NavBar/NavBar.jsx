import { useNavigate } from 'react-router-dom'
import { useUser } from '../UserProvider/UserProvider'
import './NavBar.css'
import { useState } from 'react'
import { logoutUser } from '../../utils/ApiUtils'

const NavBar = () => {
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const { user, setUser } = useUser()

    const navigate = useNavigate()

    const toggleUserDropdown = () => {
        setShowUserDropdown(prev => !prev)
    }

    const handleLogout = async () => {
        const serverResponse = await logoutUser()
        if (serverResponse.status === 'success') {
            setUser('')
            navigate('/')
        }
        setShowUserDropdown(false)
    }

    return(
        <div className='navbar-div'>
            <div className='navbar'>
                <div className='navbar-pages'>
                    <a id='home-page-link' href='/'>Home</a>
                    <a id='parts-page-link' href='/parts'>Part Evaluator</a>
                    <a id='builds-page-link' href='/builds/generator'>Build Generator</a>
                    <a id='deal-watch-page-link' href='/deal-watch'>Deal Watch</a>
                </div>
                <div className='navbar-user'>
                    { user ? 
                    <div id='navbar-user-loggedin' className='dropdown'>
                        <button id='user-dropdown-button' onClick={toggleUserDropdown} className="dropdown-button">{user}</button>
                    </div>
                    : 
                    <div className='navbar-user-loggedout'>
                        <a id='login-button' href='/login'>Login</a>
                        <a id='signup-button' href='/signup'>Sign Up</a>
                    </div> }
                </div>
            </div>
            { showUserDropdown ?
            <div id="user-dropdown-options" className="dropdown-content">
                <a id='user-saved-builds-button' href="/builds/saved">Saved Builds</a>
                <a id='user-logout-button' onClick={handleLogout}>Logout</a>
            </div>
            : null }
        </div>
    )
}

export default NavBar