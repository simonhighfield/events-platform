import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { monitorSupabaseSession } from './utils/monitorSupabaseSession'
import { handleSignOut } from './utils/handleSignOut'
import { addCurrentUserToPublicUserProfiles } from './utils/addCurrentUserToPublicUserProfiles'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NoPage from './components/NoPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SessionContext } from './Contexts'

function App() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {    
    return monitorSupabaseSession(setSession)
  }, [])

  return (
    <>
      <SessionContext.Provider value={{session}}>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="*" element={<NoPage/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </SessionContext.Provider>
    </>    
  )
}

export default App