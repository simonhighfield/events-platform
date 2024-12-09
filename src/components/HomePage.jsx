import { useContext, useState } from 'react'
import { ProfileContext, SessionContext } from '../Contexts'
import SessionId from './SessionId';
import fetchAndSortAllEvents from '../utils/fetchAndSortAllEvents.js';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import { postAdminEvent } from '../utils/postAdminEvent';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import deleteAdminEventById from '../utils/deleteAdminEventById';
import fetchAdminEventById from '../utils/fetchAdminEventById';
import fetchAdminEventsByDate from '../utils/fetchAdminEventsByDate.js';
import fetchAdminEvents from '../utils/fetchAdminEvents.js';
import saveEvent from '../utils/saveEvent.js';

export default function HomePage () {
    const { profile } = useContext(ProfileContext)

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
            .catch(({ error }) => {
                console.log(error);
            })
        })
    }

    function handleSaveEvent() {
        saveEvent(profile)
        .then(({ savedEvent }) => {
            console.log(savedEvent);
        })
        .catch(({ error }) => {
            console.log(error);
        })
    }

    return (
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
            <button onClick={handleFetchAllEvents}>get all events</button>
            <button onClick={handlePostAdminEvent}>post test admin event</button>
            <button onClick={handleSaveEvent}>save a test event</button>
        </>
    )
}