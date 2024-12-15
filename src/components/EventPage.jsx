import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import fetchSkiddleEventById from "../utils/fetchSkiddleEventById";
import fetchAdminEventById from '../utils/fetchAdminEventById';
import formatSkiddleEvent from '../utils/formatSkiddleEvent';

export default function EventPage () {
    const { eventSource, eventId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [eventFetched, setEventFetched] = useState({})

    useEffect(() => {
        setIsLoading(true)
        
        if (eventSource === 'admin') {
            fetchAdminEventById(eventId)
            .then(({ event }) => {
                setEventFetched(event)
            })
            .catch(({error}) => {
            })
            .finally(() => {
                setIsLoading(false)
            })
        } else if (eventSource === 'skiddle') {
            fetchSkiddleEventById(eventId)
            .then(({ event }) => {
                const formattedEvent = formatSkiddleEvent(event)
                setEventFetched(formattedEvent)
            })
            .catch(({error}) => {
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    },[eventId])

    return(
        <h1>{eventFetched.event_name}</h1>

    )
}