import { useContext, useState } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';
import fetchAllEvents from '../utils/fetchAllEvents';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';

export default function HomePage () {

    function handleFetchAllEvents () {
        fetchAllEvents(skiddleParamsForClubEventsInManchester)
        .then((events) => {
        })
        .catch((error) => {
            window.alert(error.message)
        })
    }

    return(
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
            <button onClick={handleFetchAllEvents}>get all events</button>
        </>
    )
}