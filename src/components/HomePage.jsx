import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import SessionId from './SessionId';

export default function HomePage () {

    return(
        <>
            <h1>HomePage.jsx</h1>
            <SessionId/>
        </>
    )
}