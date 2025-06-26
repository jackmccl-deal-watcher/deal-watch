import { useUser } from '../UserProvider/UserProvider'
import './NavBar.css'
import { useState } from 'react'

const NavBar = () => {
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    console.log(useUser())
    const { user, setUser } = useUser()

    const toggleUserDropdown = () => {
        setShowUserDropdown(prev => !prev)
    }

    return(
        <div className='navbar'>
            <div className='navbar-pages'>
                <a href='/'>Home</a>
                <a href='/parts'>Parts</a>
                <a href='/builds'>Builds</a>
            </div>
            <div className='navbar-user'>
                { user ? 
                <div id='navbar-user-loggedin' className='dropdown'>
                    <button onClick={toggleUserDropdown} class="dropdown-button">{user}</button>
                    { showUserDropdown ?
                    <div id="user-dropdown-options" class="dropdown-content">
                        <a href="/">Link 1</a>
                        <a href="/">Link 2</a>
                        <a href="/">Link 3</a>
                    </div>
                    : null }
                </div>
                : 
                <div className='navbar-user-loggedout'>
                    <a href='login'>Login</a>
                    <a href='/signup'>Sign Up</a>
                </div> }
            </div>
        </div>
    )
}

export default NavBar