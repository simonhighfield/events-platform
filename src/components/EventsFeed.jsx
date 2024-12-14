import { useContext } from 'react'
import { SessionContext } from '../Contexts'

export default function EventsFeed () {
    const { session } = useContext(SessionContext);

    return (
        <>
        <h2>EventsFeed.jsx</h2>
        </>
    )
}