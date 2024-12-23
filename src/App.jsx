import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { monitorSupabaseSession } from './utils/monitorSupabaseSession'
import initialiseGoogleApiClient from './utils/initialiseGoogleApiClient'
import { SessionContext, ProfileContext, GoogleTokenContext } from './Contexts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage'
import SavedEventsPage from './components/SavedEventsPage';
import ProfilePage from './components/ProfilePage';
import AddEventPage from './components/AddEventPage';
import EventPage from './components/EventPage'
import EditEventPage from './components/EditEventPage'
import NoPage from './components/NoPage';

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [googleToken, setGoogleToken] = useState(null)

  useEffect(() => {    
    initialiseGoogleApiClient()
    return monitorSupabaseSession(setSession, setProfile)
  }, [])

  return (
    <>
      <SessionContext.Provider value={{session}}>
      <ProfileContext.Provider value={{profile}}>
      <GoogleTokenContext.Provider value={{googleToken, setGoogleToken}}>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="sign-in" element={<SignInPage/>} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="saved-events" element={<SavedEventsPage/>} />
            <Route path="add-event" element={<AddEventPage/>} />
            <Route path='/events/:eventSource/:eventId' element={<EventPage/>} />
            <Route path='/events/:eventSource/:eventId/edit' element={<EditEventPage/>} />
            <Route path="*" element={<NoPage/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </GoogleTokenContext.Provider>
      </ProfileContext.Provider>
      </SessionContext.Provider>
    </>    
  )
}