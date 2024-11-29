import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { handleSignOut } from "../utils/handleSignOut"
import { addCurrentUserToPublicUserProfiles } from "../utils/addCurrentUserToPublicUserProfiles"

export default function LoginPage ({ session }) {

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