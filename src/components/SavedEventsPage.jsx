import { supabase } from "../utils/supabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../Contexts"
import fetchSavedEventsByUserId from "../utils/fetchSavedEventsByUserId"
import Loading from "./Loading"
import EventsFeed from "./EventsFeed"
import { generateSavedEvents } from "../utils/generateSavedEvents"
import HelloProfile from "./HelloProfile"

export default function Login() {
    const { profile } = useContext(ProfileContext)
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (profile) {
            setIsLoading(true)
            fetchSavedEventsByUserId(profile.id)
            .then(({ savedEvents }) => {
                return generateSavedEvents( savedEvents )                
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


    if (!profile) {
        return (
            <main className='responsive-page-sizing'>
                <HelloProfile/>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
            </main>
        )
    } else {
        return (
            <main className='responsive-page-sizing'>
                {isLoading
                    ? <Loading/>
                    : <EventsFeed events={eventsFound} />
                }
            </main>
        )
    }

}