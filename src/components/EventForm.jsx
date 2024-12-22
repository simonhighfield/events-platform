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
import { updateAdminEvent } from '../utils/updateAdminEvent';

export default function EventForm({ mode, event}) {
    const { profile } = useContext(ProfileContext);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();    
    
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [contributors, setContributors] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if (mode === 'edit') {
            setEventName(event.event_name || '');
            setEventDate(convertDateToYYYYMMDD(event.event_date || ''));
            setEventTime(getTimefromDateinHHMM(event.event_date || ''));
            setContributors(getEventContributors(event) || '');
            setLocation(event.location || '');
            setDescription(event.description || '');
            setPhotoUrl(event.event_photo_url || '');
        }
    }, []);


    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setValidated(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {    
            const eventData = {
                admin_id: profile.id,
                event_name: eventName,
                event_date: getDateAsObject(eventDate, eventTime),
                location: location,
                contributors: contributors.split(', '),
                event_photo_url: photoUrl,
                description: description,
                additional_data: null,
            };
            
            if (mode === 'edit') {
                eventData.admin_event_id = event.admin_event_id

                updateAdminEvent(eventData)
                postAdminEvent(eventData)
                .then(({ event })=> {
                    navigate(`/events/admin/${event.admin_event_id}`)
                })
                .catch(({ error }) => {
                    console.error(error);
                })
            } else {
                postAdminEvent(eventData)
                .then(({ event })=> {
                    navigate(`/events/admin/${event.admin_event_id}`)
                })
                .catch(({ error }) => {
                    console.error(error);
                })
            }
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

            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Name of the venue" 
                    size="lg"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter an event location
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="artists">
                <Form.Label>Artists</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Artist 1, Artist 2, etc" 
                    size="lg"
                    value={contributors}
                    onChange={(event) => setContributors(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={8} 
                    size="lg" 
                    placeholder="Describe your party"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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

            <div className="d-grid gap-2">
            <Button 
                type="submit" 
                size="lg"
                variant={mode === 'edit' ? 'primary' : 'success'}
            >
                Save Event
            </Button>
            </div>
        </Form>
    );
}
