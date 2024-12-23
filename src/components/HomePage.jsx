"use client";
import { useEffect, useState } from 'react'
import fetchAndSortAllEvents from '../utils/fetchAndSortAllEvents.js';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import HelloProfile from './HelloProfile.jsx';
import EventsFeed from './EventsFeed.jsx';
import Loading from './Loading.jsx';
import { ErrorBoundary } from "react-error-boundary";
import Fallback from './Fallback.jsx';

export default function HomePage () {
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
        .then(({ events }) => {
            setEventsFound(events)
        })
        .catch((error) => {
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <main className='responsive-page-sizing'>
            <h1>Home</h1>
            <ErrorBoundary FallbackComponent={Fallback}>
                <HelloProfile/>
                {isLoading
                    ? <Loading/>
                    : <EventsFeed events={eventsFound} />
                }
            </ErrorBoundary>
        </main>
    )
}