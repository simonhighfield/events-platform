import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { handleSignOut } from "../utils/handleSignOut"
import { addCurrentUserToPublicUserProfiles } from "../utils/addCurrentUserToPublicUserProfiles"
import { useContext, useEffect } from 'react'
import { GoogleTokenContext, SessionContext } from '../Contexts'
import HelloProfile from './HelloProfile'
import connectGoogleAccount from '../utils/connectGoogleAccount'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import LoadingButton from './LoadingButton';
import { useLocation, useNavigate } from 'react-router-dom'


export default function ProfilePage () {
  const { session } = useContext(SessionContext);
  const { token, setGoogleToken } = useContext(GoogleTokenContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
      if (!session) {
        navigate('/sign-in', {state: {previousUrl: location.pathname}});
      }
  },[session])

  async function handleGoogleSignIn() {
    const { token } = await connectGoogleAccount()
    setGoogleToken(token)
  }

  return (
    <main className='responsive-page-sizing'>
      <HelloProfile/>
      <div className="d-grid gap-2">
        <LoadingButton
          asyncFunction={handleGoogleSignIn}
          initialVariant='success'
          initialText={'Connect Google Calendar'}
          successText = {'Google Calendar connected'}
        />
        <Button
          onClick={handleSignOut}
          variant="danger"
          size="lg"
        >
          Sign out
        </Button>
      </div>
    </main>
  )
}