import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './utils/supabaseClient'
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
          <Route path="login" element={<LoginPage/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>    
  )
  
  // if (!session) {
  //   return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>)
  // } else {
  //   return (
  //     <>
  //       <div>Logged in!</div>
  //       <button onClick={handleSignOut}>sign out</button>
  //       <button onClick={() => addCurrentUserToPublicUserProfiles(session)}>add user to publicprofiles</button>
  //     </>
  //   )
  // }
}

export default App