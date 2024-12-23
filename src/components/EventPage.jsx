"use client";
import { useContext, useEffect, useState } from 'react'
import { GoogleTokenContext, ProfileContext, SessionContext } from '../Contexts'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { convertDateToYYYYMMDD } from '../utils/convertDateToYYYYMMDD';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import fetchSkiddleEventById from "../utils/fetchSkiddleEventById";
import fetchAdminEventById from '../utils/fetchAdminEventById';
import formatSkiddleEvent from '../utils/formatSkiddleEvent';
import Loading from './Loading';
import { getTimefromDateinHHMM } from '../utils/getTimefromDateinHHMM';
import { getEventContributors } from '../utils/getEventContributors';
import { addEventToGoogleCalendar } from '../utils/addEventToGoogleCalendar';
import LoadingButton from './LoadingButton';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import saveEvent from '../utils/saveEvent';
import paramsForTestSaveEvent from '../data/paramsForTestSaveEvent';
import deleteSavedEventById from '../utils/deleteSavedEventById';
import fetchSavedEventsByUserId from '../utils/fetchSavedEventsByUserId';
import getEventId from '../utils/getEventId';
import deleteAdminEventById from '../utils/deleteAdminEventById';
import connectGoogleAccount from '../utils/connectGoogleAccount'
import { ErrorBoundary } from "react-error-boundary";
import Fallback from './Fallback.jsx';


export default function EventPage () {
    const { eventSource, eventId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(true)
    const [event, setEvent] = useState({})
    const [eventDate, setEventDate] = useState(null)
    const { profile } = useContext(ProfileContext)    
    const [eventIsSaved, setEventIsSaved] = useState(false)
    const [savedId, setSavedId] = useState('')    
    const navigate = useNavigate()
    const location = useLocation()
    const { googleToken, setGoogleToken } = useContext(GoogleTokenContext)
    

    async function handleGoogleSignIn() {
        const { token } = await connectGoogleAccount()
        console.log('set it to', token);
        setGoogleToken(token)
        setGoogleConnected(true)
    }
    
    useEffect(() => {
        console.log(googleToken);
    },[googleToken])


    useEffect(() => {
        setIsLoading(true)
        
        if (eventSource === 'admin') {
            fetchAdminEventById(eventId)
            .then(({ event }) => {
                setEvent(event)
                const formattedDate = convertDateToYYYYMMDD(event.event_date)
                setEventDate(formattedDate)
            })
            .catch((error) => {
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
            .catch((error) => {
                console.log('ploblem');
                
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    },[eventId])

    useEffect(() => {
        if (!isLoading && profile) {
            fetchSavedEventsByUserId(profile.id)
            .then(({ savedEvents }) => {
                savedEvents.forEach(savedEvent => {
                    
                    const savedEventId = savedEvent.admin_event_id || savedEvent.skiddle_event_id;
                    // console.log(savedEvent, savedEventId);

                    if (savedEventId === eventId) {
                        // console.log('this event has already been saved with id = ', savedEvent.id);
                        setEventIsSaved(true)
                        setSavedId(savedEvent.id)
                    }
                });
            })
        }
    },[isLoading, profile, eventId])


    function handleDelete () {
        deleteSavedEventById(savedId)
        .then(({ deletedEvent }) => {
            setSavedId('')
            setEventIsSaved(false)
        })
        .catch((error) => {
        })
    }

    function handleSave () {
        saveEvent(profile, event)
        .then(({ savedEvent }) => {
            setSavedId(savedEvent.id)
            setEventIsSaved(true)
        })
        .catch((error) => {
        })
    }

    function handleNavigateToSignin() {        
        navigate('/sign-in', {state: {previousUrl: location.pathname}});
    }   

    function handleEdit() {
        navigate(`/events/admin/${event.admin_event_id}/edit`);
    }

    return(   
        <main className='responsive-page-sizing'>
            <ErrorBoundary FallbackComponent={Fallback}>
            
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
                            {!profile 
                                ? <Button 
                                    onClick={handleNavigateToSignin}
                                    variant="success"
                                    size="lg"
                                >
                                    Sign in to save event
                                </Button>
                                :
                                <>
                                    {eventIsSaved
                                        ? <Button
                                            onClick={handleDelete}
                                            variant="danger"
                                            size="lg"
                                        >
                                            Remove from Saved Events
                                        </Button> 

                                        : <Button 
                                            onClick={handleSave}
                                            variant="success"
                                            size="lg"
                                        >
                                            Add to Saved Events
                                        </Button>
                                    }
                                    {!googleToken &&
                                        <LoadingButton
                                            asyncFunction={handleGoogleSignIn}
                                            initialVariant='success'
                                            initialText={'Connect Google Calendar'}
                                            successText = {'Google Calendar connected'}
                                    />
                                    }
                                    {googleToken &&
                                        <LoadingButton 
                                            asyncFunction={addEventToGoogleCalendar}
                                            args={[event]}
                                            initialText={'Add to Google Calendar'}
                                        />
                                    }
                                    {profile.is_admin && eventSource === 'admin' &&
                                        <Button
                                            onClick={handleEdit}
                                            variant="primary"
                                            size="lg"
                                        >
                                            Edit event
                                        </Button> 
                                    }
                                </>
                            }
                                {/* {eventIsSaved 
                                    ? <LoadingButton 
                                        asyncFunction={deleteSavedEventById}
                                        args={[savedId]}
                                        initialText='Remove from Saved Events'
                                        initialVariant = "danger"
                                    />
                                    : <LoadingButton 
                                        asyncFunction={saveEvent}
                                        args={[profile, event]}
                                        initialText='Add to Saved Events'
                                    />
                                } */}
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
            </ErrorBoundary>
        </main>
    )
}