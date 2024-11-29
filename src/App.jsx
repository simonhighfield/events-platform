import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { createSupabaseSession } from './utils/createSupabaseSession'
import { handleSignOut } from './utils/handleSignOut'
import { addCurrentUserToPublicUserProfiles } from './utils/addCurrentUserToPublicUserProfiles'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NoPage from './components/NoPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    return createSupabaseSession(setSession)
  }, [])

  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="login" element={<LoginPage session={session}/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>    
  )
}

export default App