import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './supabaseClient'
import { createSupabaseSession } from './createSupabaseSession'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    return createSupabaseSession(setSession)
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Logged in!</div>)
  }
}

export default App