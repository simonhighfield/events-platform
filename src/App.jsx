import './index.css'
import './App.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './utils/supabaseClient'
import { createSupabaseSession } from './utils/createSupabaseSession'
import { handleSignOut } from './utils/handleSignOut'
import { addCurrentUserToPublicUserProfiles } from './utils/addCurrentUserToPublicUserProfiles'

function App() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    return createSupabaseSession(setSession)
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>)
  } else {
    return (
      <>
        <div>Logged in!</div>
        <button onClick={handleSignOut}>sign out</button>
        <button onClick={() => addCurrentUserToPublicUserProfiles(session)}>add user to publicprofiles</button>
      </>
    )
  }
}

export default App