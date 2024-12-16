import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext } from 'react'
import { GoogleTokenContext, SessionContext } from '../Contexts'
import HelloProfile from './HelloProfile'
import connectGoogleAccount from '../utils/connectGoogleAccount'


export default function SignInPage () {
    const { session } = useContext(SessionContext);
    const { token, setGoogleToken } = useContext(GoogleTokenContext)

return (<main className='responsive-page-sizing'>
    <HelloProfile/>
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
  </main>)
}
