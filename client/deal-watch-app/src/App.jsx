import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage.jsx'
import NoMatch from './components/NoMatch/NoMatch.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import './App.css'
import { UserProvider } from './components/UserProvider/UserProvider.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/SignUp/SignUp.jsx'

function App() {

  return (
    <div className='app'>
      <UserProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='*' element={<NoMatch/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
