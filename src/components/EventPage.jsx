import { useContext, useEffect, useState } from 'react'
import { ProfileContext, SessionContext } from '../Contexts'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { convertDateToYYYYMMDD } from '../utils/convertDateToYYYYMMDD';
import { Link, useParams } from 'react-router-dom';
import fetchSkiddleEventById from "../utils/fetchSkiddleEventById";
import fetchAdminEventById from '../utils/fetchAdminEventById';
import formatSkiddleEvent from '../utils/formatSkiddleEvent';
import Loading from './Loading';
import { getTimefromDateinHHMM } from '../utils/getTimefromDateinHHMM';
import { getEventContributors } from './getEventContributors';
import { addEventToGoogleCalendar } from '../utils/addEventToGoogleCalendar';
import LoadingButton from './LoadingButton';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import saveEvent from '../utils/saveEvent';
import paramsForTestSaveEvent from '../data/paramsForTestSaveEvent';

export default function EventPage () {
    const { eventSource, eventId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [event, setEvent] = useState({})
    const [eventDate, setEventDate] = useState(null)
    const { profile } = useContext(ProfileContext)    

    useEffect(() => {
        setIsLoading(true)
        
        if (eventSource === 'admin') {
            fetchAdminEventById(eventId)
            .then(({ event }) => {
                setEvent(event)
                const formattedDate = convertDateToYYYYMMDD(event.event_date)
                setEventDate(formattedDate)
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
                setEvent(formattedEvent)
                const formattedDate = convertDateToYYYYMMDD(formattedEvent.event_date)
                setEventDate(formattedDate)
            })
            .catch(({error}) => {
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    },[eventId])

    return(   
        <main className='responsive-page-sizing'>
            {isLoading 
                ? <Loading/>
                : <Card>
                    <Card.Img variant="top" src={event.event_photo_url} />
                    <Card.Body>
                        <Card.Title>{event.event_name}</Card.Title>
                        <Card.Text>
                        {event.description}
                        </Card.Text>
                        <div className="d-grid gap-2">
                            <LoadingButton 
                                asyncFunction={saveEvent}
                                args={[profile, paramsForTestSaveEvent]}
                                initialText='Add to Saved Events'
                            />
                            <LoadingButton 
                                asyncFunction={addEventToGoogleCalendar}
                                args={[event]}
                                initialText='Add to Google Calendar'
                            />
                        </div>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        {event.contributors.length > 0
                            ? <ListGroup.Item> {getEventContributors(event)} </ListGroup.Item>
                            : null
                        }
                        <ListGroup.Item>{eventDate}</ListGroup.Item>
                        <ListGroup.Item>{getTimefromDateinHHMM(event.event_date)}</ListGroup.Item>
                        <ListGroup.Item>{event.location}</ListGroup.Item>
                    </ListGroup>
                </Card> 
            }
        </main>
    )
}