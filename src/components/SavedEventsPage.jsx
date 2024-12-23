"use client";
import { useContext, useEffect, useState } from "react"
import { ProfileContext, SessionContext } from "../Contexts"
import { useLocation, useNavigate } from "react-router-dom"
import fetchSavedEventsByUserId from "../utils/fetchSavedEventsByUserId"
import { generateSavedEvents } from "../utils/generateSavedEvents"
import Loading from "./Loading"
import EventsFeed from "./EventsFeed"
import { ErrorBoundary } from "react-error-boundary";
import Fallback from './Fallback.jsx';

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
            .catch((error) => {                
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    }, [profile])

    return (
        <main className='responsive-page-sizing'>
            <h1>Saved Events</h1>
            <ErrorBoundary FallbackComponent={Fallback}>
                {!eventsFound || eventsFound.length === 0 &&
                    <p>Your saved events will show here</p>
                }
                {isLoading
                    ? <Loading/>
                    : <EventsFeed events={eventsFound} />
                }
            </ErrorBoundary>
        </main>
    )
}