"use client";
import { useEffect, useState } from 'react'
import fetchAndSortAllEvents from '../utils/fetchAndSortAllEvents.js';
import skiddleParamsForClubEventsInManchester from '../data/skiddleParamsForClubEventsInManchester';
import EventsFeed from './EventsFeed.jsx';
import Loading from './Loading.jsx';
import HelloProfile from './HelloProfile.jsx';
import { ErrorBoundary } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
  
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }


export default function HomePage () {
    const [ eventsFound, setEventsFound ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
        .then(({ events }) => {
            setEventsFound(events)
        })
        .catch(({error}) => {
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <main className='responsive-page-sizing'>
            <ErrorBoundary
                fallbackRender={fallbackRender}
                onReset={(details) => {
                    console.log(details);
                    
                    // Reset the state of your app so the error doesn't happen again
                }}
            >
                <h1>Home</h1>
                <HelloProfile/>
                {isLoading
                    ? <Loading/>
                    : <EventsFeed events={eventsFound} />
                }
            </ErrorBoundary>
        </main>
    )
}