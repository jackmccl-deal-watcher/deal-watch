import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage.jsx'
import NoMatch from './components/NoMatch/NoMatch.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import './App.css'

function App() {

  return (
    <div className='app'>
          <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='*' element={<NoMatch/>} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App
