import { useContext, useState } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';
import getAllEvents from '../utils/getAllEvents';

export default function HomePage () {

    return(
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
            <button onClick={getAllEvents}>fetch skiddle events</button>
        </>
    )
}