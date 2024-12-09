import { useContext, useState } from 'react'
import { ProfileContext, SessionContext } from '../Contexts'
import SessionId from './SessionId';
import fetchAllEvents from '../utils/fetchAllEvents';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import { postAdminEvent } from '../utils/postAdminEvent';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import deleteAdminEventById from '../utils/deleteAdminEventById';
import fetchAdminEventById from '../utils/fetchAdminEventById';
import fetchAdminEventsByDate from '../utils/fetchAdminEventsByDate.js';
import fetchAdminEvents from '../utils/fetchAdminEvents.js';

export default function HomePage () {
    const { profile } = useContext(ProfileContext)

    function handleFetchAllEvents () {
        fetchAllEvents(skiddleParamsForClubEventsInManchester)
        .then((events) => {
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
            fetchAdminEvents()
            .then(({ events }) => {
                console.log(events);
            })
            .catch(({ error }) => {
                console.log(error);
            })
        })
        
    }

    return(
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
            <button onClick={handleFetchAllEvents}>get all events</button>
            <button onClick={handlePostAdminEvent}>post test admin event</button>
        </>
    )
}