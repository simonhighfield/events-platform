import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './supabaseClient'
import { createSupabaseSession } from './createSupabaseSession'
import { handleSignOut } from './handleSignOut'
import Login from './components/Login'



function App() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    return createSupabaseSession(setSession)
  }, [])

  async function addCurrentUserToPublicUserProfiles() {
    
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({ id: session.user.id, username: 'new user', is_admin: false, user_photo_url: '' })
    if (data) {
        console.log('sucesfully posted to user_profiles with the data: ', data)
    }
    if (error) {
        alert(error.error_description || error.message)
    }
  }

  if (!session) {
    // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>)
    return (<Login/>)
  }
  else {
    return (
      <>
        <div>Logged in!</div>
        <button onClick={handleSignOut}>sign out</button>
        <button onClick={addCurrentUserToPublicUserProfiles}>add user to public.user_profiles</button>
        
      </>
    )
  }
}

export default App