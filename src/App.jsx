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
import { SessionContext, ProfileContext } from './Contexts'
import initialiseGoogleApiClient from './utils/googleCalClient'

function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {    
    initialiseGoogleApiClient()
    return monitorSupabaseSession(setSession, setProfile)
  }, [])

  return (
    <>
      <SessionContext.Provider value={{session}}>
      <ProfileContext.Provider value={{profile}}>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="*" element={<NoPage/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </ProfileContext.Provider>
      </SessionContext.Provider>
    </>    
  )
}

export default App