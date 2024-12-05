import { useContext, useState } from 'react'
import { ProfileContext, SessionContext } from '../Contexts'
import SessionId from './SessionId';
import fetchAllEvents from '../utils/fetchAllEvents';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import { postAdminEvent } from '../utils/postAdminEvent';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import deleteAdminEvent from '../utils/deleteAdminEvent';

export default function HomePage () {
    const { profile } = useContext(ProfileContext)

    function handleFetchAllEvents () {
        fetchAllEvents(skiddleParamsForClubEventsInManchester)
        .then((events) => {
        })
        .catch((error) => {
            window.alert(error.message)
        })
    }

    function handlePostAdminEvent() {
        paramsForTestAdminEvent.admin_id = profile.id
        postAdminEvent(paramsForTestAdminEvent)
        .then(({event})=> {
            deleteAdminEvent(event.admin_event_id)
            .then(({event}) => {
                console.log('deleted event: ', event);
            })
            .catch((error) => {
                console.log(error.message)
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