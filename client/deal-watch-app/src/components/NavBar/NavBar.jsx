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
    }

    return(
        <div className='navbar'>
            <div className='navbar-pages'>
                <a href='/'>Home</a>
                <a href='/parts'>Parts</a>
                <a href='/builds/generator'>Builds</a>
            </div>
            <div className='navbar-user'>
                { user ? 
                <div id='navbar-user-loggedin' className='dropdown'>
                    <button onClick={toggleUserDropdown} className="dropdown-button">{user}</button>
                    { showUserDropdown ?
                    <div id="user-dropdown-options" className="dropdown-content">
                        <a href="/parts/favorites">Favorite Parts</a>
                        <a href="/builds/saved">Saved Builds</a>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                    : null }
                </div>
                : 
                <div className='navbar-user-loggedout'>
                    <a href='/login'>Login</a>
                    <a href='/signup'>Sign Up</a>
                </div> }
            </div>
        </div>
    )
}

export default NavBar