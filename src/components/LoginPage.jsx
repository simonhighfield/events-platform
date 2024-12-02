import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { handleSignOut } from "../utils/handleSignOut"
import { addCurrentUserToPublicUserProfiles } from "../utils/addCurrentUserToPublicUserProfiles"
import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';


export default function LoginPage () {
    const { session } = useContext(SessionContext);

    if (!session) {
        return (
          <>
            <SessionId/>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
          </>
        )
      } else {
        return (
          <>
            <SessionId/>
            <button onClick={handleSignOut}>sign out</button>
            <button onClick={() => addCurrentUserToPublicUserProfiles(session)}>add user to publicprofiles</button>
          </>
        )
      }
}