import './NavBar.css'
import { useState } from 'react'

const NavBar = () => {
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const [testLogin, setTestLogin] = useState(true)

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
                { testLogin ? 
                <div id='navbar-user-loggedin' className='dropdown'>
                    <button onClick={toggleUserDropdown} class="dropdown-button">username</button>
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
                    <button className='navbar-user-login'>Login</button>
                    <button className='navbar-user-signup'>Sign Up</button>
                </div> }
            </div>
        </div>
    )
}

export default NavBar