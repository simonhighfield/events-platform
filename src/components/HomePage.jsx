import { useContext, useState } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';
import getAllEvents from '../utils/getAllEvents';

export default function HomePage () {

    function handleGetAllEvents () {
        getAllEvents()
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
            <button onClick={handleGetAllEvents}>get all events</button>
        </>
    )
}