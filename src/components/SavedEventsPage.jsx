import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../Contexts"
import fetchSavedEventsByUserId from "../utils/fetchSavedEventsByUserId"
import Loading from "./Loading"
import EventsFeed from "./EventsFeed"
import { generateSavedEvents } from "../utils/generateSavedEvents"

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
                <p>Please sign in to view your saved events</p>
            </main>
        )
    }

    return (
        <main className='responsive-page-sizing'>
            {isLoading
                ? <Loading/>
                : <EventsFeed events={eventsFound} />
            }
        </main>
    )
}