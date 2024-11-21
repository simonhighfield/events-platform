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

  if (!session) {
    // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>)
    return (<Login/>)
  }
  else {
    return (
      <>
        <div>Logged in!</div>
        <button onClick={handleSignOut}>sign out</button>
      </>
    )
  }
}

export default App