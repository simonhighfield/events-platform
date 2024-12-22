import { supabase } from "../utils/supabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext, useEffect, useState } from "react"
import { ProfileContext, SessionContext } from "../Contexts"
import fetchSavedEventsByUserId from "../utils/fetchSavedEventsByUserId"
import Loading from "./Loading"
import EventsFeed from "./EventsFeed"
import { generateSavedEvents } from "../utils/generateSavedEvents"
import HelloProfile from "./HelloProfile"
import { useLocation, useNavigate } from "react-router-dom"

export default function Login() {
    const { profile } = useContext(ProfileContext)
    const { session } = useContext(SessionContext);
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!session) {
          navigate('/sign-in', {state: {previousUrl: location.pathname}});
        }
    },[session])

    useEffect(() => {
        if (profile) {
            setIsLoading(true)
            fetchSavedEventsByUserId(profile.id)
            .then(({ savedEvents }) => {
                return generateSavedEvents(savedEvents)                
            })
            .then((generatedEvents) => {
                setEventsFound(generatedEvents)
            })
            .catch(({error}) => {
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    }, [profile])

    return (
        <main className='responsive-page-sizing'>
            <h1>Saved Events</h1>
            {!eventsFound || eventsFound.length === 0 &&
                <p>Your saved events will show here</p>
            }
            {isLoading
                ? <Loading/>
                : <EventsFeed events={eventsFound} />
            }
        </main>
    )
}