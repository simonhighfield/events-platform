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
import EventsFeed from './EventsFeed.js';
import Loading from './Loading.js';
import HelloProfile from './HelloProfile.js';

export default function TestPage () {
    const { profile } = useContext(ProfileContext)
    const { googleToken, setGoogleToken } = useContext(GoogleTokenContext)
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
        .then(({ events }) => {
            setEventsFound(events)
        })
        .catch((erro}) => {
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])


    function handleFetchAllEvents () {
        fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
        .then(({ events }) => {
            console.log('return in handle: ', events);
        })
        .catch((error) => {
            window.alert(error.message)
        })
    }

    function handlePostAdminEvent() {
        paramsForTestAdminEvent.admin_id = profile.id
        postAdminEvent(paramsForTestAdminEvent)
        .then(({ event })=> {
            console.log('successfully posted: ', event);
            fetchAdminEvents()
            .then(({ adminEvents }) => {
                console.log(adminEvents);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }

    function handleSaveEventSequence() {
        saveEvent(profile, paramsForTestSaveEvent)
        .then(({ savedEvent }) => {
            console.log('successfully saved: ', savedEvent);
            fetchSavedEventsByUserId(profile.id)
            .then(({ savedEvents }) => {
                console.log('saved events: ', savedEvents);

                Promise.all([
                    generateSavedEvents(savedEvents), 
                    deleteSavedEventById(savedEvents[0].id)
                ])
                .then (([generatedEvents, { deletedEvent }]) => {
                    console.log('generatedEvents: ', generatedEvents)
                    console.log('deleted saved event: ', deletedEvent);
                })
                .catch((error) => {
                    console.log(error.message);
                })
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleSaveEvent() {
        saveEvent(profile, paramsForTestSaveEvent)
        .then(({ savedEvent }) => {
            console.log('successfully saved: ', savedEvent);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    // function handleDeleteSavedEvent() {
    //     console.log(paramsForTestSaveEvent);
        
    //     deleteSavedEventById(paramsForTestSaveEvent.id)        
    //     .then (( { deletedEvent }) => {
    //         console.log('deleted saved event: ', deletedEvent);
    //     })
    //     .catch((error) => {
    //         console.log(error.message);
    //     })
    // }

    async function handleGoogleSignIn() {
        const { token } = await connectGoogleAccount()
        setGoogleToken(token)
    }

    function handleAddEventToGoogleCalendar() {
        addEventToGoogleCalendar(paramsForTestAdminEvent, googleToken)
        .then(({ eventAdded }) => {
            console.log('In handle, Event added to cal: ', eventAdded);
        })
    }

    return (
        <main className='responsive-page-sizing'>
            <h1>Home</h1>
            <HelloProfile/>
            <button onClick={handleFetchAllEvents}>get all events</button>
            <button onClick={handlePostAdminEvent}>post test admin event</button>
            <button onClick={handleSaveEventSequence}>save a test event, fetch all, and delete the just saved one</button>
            <button onClick={handleSaveEvent}>save test event</button>
            {/* <button onClick={handleDeleteSavedEvent}>delete the test saved event</button> */}
            <button onClick={handleGoogleSignIn}>connect to google</button>
            <button onClick={handleAddEventToGoogleCalendar}>Add test event to google cal</button>
        </main>
    )
}