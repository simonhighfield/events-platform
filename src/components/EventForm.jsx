import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../Contexts';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import { postAdminEvent } from '../utils/postAdminEvent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getDateAsObject } from '../utils/getDateAsObject';
import { useNavigate } from 'react-router-dom';
import { getEventContributors } from './getEventContributors';
import { convertDateToYYYYMMDD } from '../utils/convertDateToYYYYMMDD';
import { getTimefromDateinHHMM } from '../utils/getTimefromDateinHHMM';

export default function EventForm( { event = {}} ) {
    const { profile } = useContext(ProfileContext);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();    
    
    const { event_name='', event_date='', location='', description='', event_photo_url='', contributors=[]} = event
    const [eventName, setEventName] = useState(event_name);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventContributors, setEventContributors] = useState('');
    const [eventLocation, setEventLocation] = useState(location);
    const [eventDescription, setEventDescription] = useState(description);
    const [photoUrl, setPhotoUrl] = useState(event_photo_url);
    
    useEffect(() => {
        if (event_date) {
            setEventDate(convertDateToYYYYMMDD(event_date))
            setEventTime(getTimefromDateinHHMM(event_date))
        }
        if (contributors.length > 0) {
            setEventContributors(getEventContributors(event))
        }
    },[])


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {    
            const eventData = {
                admin_id: profile.id,
                event_name: eventName,
                event_date: getDateAsObject(eventDate, eventTime),
                eventLocation: eventLocation,
                eventContributors: eventContributors.split(', '),
                event_photo_url: photoUrl,
                eventDescription: eventDescription,
                additional_data: null,
            };
            
            postAdminEvent(eventData)
            .then(({ event })=> {
                navigate(`/events/admin/${event.admin_event_id}`)
            })
            .catch(({ error }) => {
                console.log(error);
            })
        } 
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="eventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Name it something grabby" 
                    size="lg"
                    value={eventName}
                    onChange={(event) => setEventName(event.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter an event name
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Form.Group as={Col} className="mb-3" controlId="eventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="name@example.com" 
                        size="lg" 
                        value={eventDate}
                        onChange={(event) => setEventDate(event.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter an event date
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="eventTime">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        placeholder="name@example.com" 
                        size="lg"
                        value={eventTime}
                        onChange={(event) => setEventTime(event.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter an event time
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="eventLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Name of the venue" 
                    size="lg"
                    value={eventLocation}
                    onChange={(event) => setEventLocation(event.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter an event eventLocation
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="artists">
                <Form.Label>Artists</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Artist 1, Artist 2, etc" 
                    size="lg"
                    value={eventContributors}
                    onChange={(event) => setEventContributors(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDescription">
                <Form.Label>Event eventDescription</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={8} 
                    size="lg" 
                    placeholder="Describe your party"
                    value={eventDescription}
                    onChange={(event) => setEventDescription(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photoUrl">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control 
                    type="url" 
                    placeholder="Enter a URL" 
                    size="lg"
                    value={photoUrl}
                    onChange={(event) => setPhotoUrl(event.target.value)}
                />
            </Form.Group>

            <Button type="submit">Submit form</Button>
        </Form>
    );
}
