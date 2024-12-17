import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext, useEffect } from 'react'
import { GoogleTokenContext, ProfileContext, SessionContext } from '../Contexts'
import connectGoogleAccount from '../utils/connectGoogleAccount'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HelloProfile from './HelloProfile'

export default function SignInPage () {
    const { session } = useContext(SessionContext);
    const { token, setGoogleToken } = useContext(GoogleTokenContext)
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const previousUrl = location.state?.previousUrl || '/';
    
    useEffect(() => {
        if (session) {
            navigate(previousUrl);
        }
    },[session])


    if (!session) {
        return ( 
            <main className='responsive-page-sizing'>
                <HelloProfile/>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
            </main>
        )
    } else {
        return (
            <main className='responsive-page-sizing'>
                <HelloProfile/>
            </main>
        )
    }

}
