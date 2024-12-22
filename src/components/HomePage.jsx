import { useContext, useEffect, useState } from 'react'
import { GoogleTokenContext, ProfileContext, SessionContext } from '../Contexts'
import fetchAndSortAllEvents from '../utils/fetchAndSortAllEvents.js';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import { postAdminEvent } from '../utils/postAdminEvent';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import deleteAdminEventById from '../utils/deleteAdminEventById';
import fetchAdminEventsByDate from '../utils/fetchAdminEventsByDate.js';
import fetchAdminEvents from '../utils/fetchAdminEvents.js';
import saveEvent from '../utils/saveEvent.js';
import paramsForTestSaveEvent from '../data/paramsForTestSaveEvent.js';
import deleteSavedEventById from '../utils/deleteSavedEventById.js';
import fetchSavedEventsByUserId from '../utils/fetchSavedEventsByUserId.js';
import { generateSavedEvents } from '../utils/generateSavedEvents.js';
import paramsForTestSaveSkiddleEvent from '../data/paramsForTestSaveSkiddleEvent';
import connectGoogleAccount from '../utils/connectGoogleAccount.js';
import { addEventToGoogleCalendar } from '../utils/addEventToGoogleCalendar.js';
import EventsFeed from './EventsFeed.jsx';
import Loading from './Loading.jsx';
import HelloProfile from './HelloProfile.jsx';

export default function HomePage () {
    const { profile } = useContext(ProfileContext)
    const { googleToken, setGoogleToken } = useContext(GoogleTokenContext)
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
        .then(({ events }) => {
            setEventsFound(events)
        })
        .catch(({error}) => {
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <main className='responsive-page-sizing'>
            <h1>Home</h1>
            <HelloProfile/>
            {isLoading
                ? <Loading/>
                : <EventsFeed events={eventsFound} />
            }
        </main>
    )
}