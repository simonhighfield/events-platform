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
import paramsForTestSaveEvent from '../data/paramsForTestSaveEvent.js';
import deleteSavedEventById from '../utils/deleteSavedEventById.js';
import fetchSavedEventsByUserId from '../utils/fetchSavedEventsByUserId.js';

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
        saveEvent(profile, paramsForTestSaveEvent)
        .then(({ savedEvent }) => {
            console.log('successfully saved: ', savedEvent);
            fetchSavedEventsByUserId(profile.id)
            .then(({ savedEvents }) => {
                console.log('saved events: ', savedEvents);
                console.log(generateSavedEvents(savedEvents))
                deleteSavedEventById(savedEvents[0].id)
                .then(({ deletedEvent }) =>{
                    console.log('deleted saved event: ', deletedEvent);
                })
            })
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

function generateSavedEvents(savedEvents) {
    return savedEvents.map(event => {
        if (event.source === 'admin') {
            console.log('admin');
            return 'admin';
        } else if (event.source === 'skiddle') {
            console.log('skiddle');
            return 'skiddle';
        }
        return null
    });
}
