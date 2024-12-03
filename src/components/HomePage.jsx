import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';
import fetchSkiddleEvents from '../utils/fetchSkiddleEvents';

export default function HomePage () {

    return(
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
            <button onClick={fetchSkiddleEvents}>fetch skiddle events</button>
        </>
    )
}