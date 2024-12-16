import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { handleSignOut } from "../utils/handleSignOut"
import { addCurrentUserToPublicUserProfiles } from "../utils/addCurrentUserToPublicUserProfiles"
import { useContext } from 'react'
import { GoogleTokenContext, SessionContext } from '../Contexts'
import SessionId from './SessionId';
import connectGoogleAccount from '../utils/connectGoogleAccount'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import LoadingButton from './LoadingButton';


export default function ProfilePage () {
    const { session } = useContext(SessionContext);
    const { token, setGoogleToken } = useContext(GoogleTokenContext)

    async function handleGoogleSignIn() {
      const { token } = await connectGoogleAccount()
      setGoogleToken(token)
    }

    

    if (!session) {
        return (
          <main className='responsive-page-sizing'>
            <SessionId/>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
          </main>
        )
      } else {
        return (
          <main className='responsive-page-sizing'>
            <SessionId/>
            <div className="d-grid gap-2">
              {/* <Button
                onClick={}
                variant="danger"
                size="lg"
              >
                Remove from Saved Events
              </Button> */}
              <LoadingButton
                asyncFunction={handleGoogleSignIn}
                initialVariant='success'
                initialText={'Connect Google Calendar'}
                successText = {'Google Calendar connected'}
              />
            </div>
            <button onClick={() => addCurrentUserToPublicUserProfiles(session)}>add user to publicprofiles</button>
          </main>
        )
      }
}