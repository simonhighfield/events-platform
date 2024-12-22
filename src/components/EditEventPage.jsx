import { useParams } from "react-router-dom";
import EventForm from "./EventForm";
import { useEffect, useState } from "react";
import fetchAdminEventById from "../utils/fetchAdminEventById";
import Loading from "./Loading";

export default function EditEventPage () {
    const { eventId } = useParams()
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            setIsLoading(true)
        
            fetchAdminEventById(eventId)
            .then(({ event }) => {
                setEvent(event)
                console.log(event);
                
                const formattedDate = convertDateToYYYYMMDD(event.event_date)
                setEventDate(formattedDate)
            })
            .catch(({error}) => {
            })
            .finally(() => {
                setIsLoading(false)
            })

        },[])


    return(   
        <main className='responsive-page-sizing'>
            {isLoading 
            ? <Loading></Loading>
            : <>
                <h1>Edit event</h1>
                <EventForm
                    mode={'edit'}
                    event={event}
                    >
                </EventForm>
            </>}
        </main>
    )
}