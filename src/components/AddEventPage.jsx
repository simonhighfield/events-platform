import { useContext, useState } from 'react';
import { ProfileContext } from '../Contexts';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import { postAdminEvent } from '../utils/postAdminEvent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getDateAsObject } from '../utils/getDateAsObject';

export default function AddEventPage() {
    const { profile } = useContext(ProfileContext);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [artists, setArtists] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    function handlePostAdminEvent() {
        
        const eventData = {
            admin_id: profile.id,
            event_name: eventName,
            event_date: getDateAsObject(eventDate, eventTime),
            location: location,
            event_photo_url: photoUrl,
            description: description,
            additional_data: null,
        };
        console.log(eventData);

        // paramsForTestAdminEvent.admin_id = profile.id
        // postAdminEvent(paramsForTestAdminEvent)
        // .then(({ event })=> {
        //     console.log('successfully posted: ', event);
        // })
        // .catch(({ error }) => {
        //     console.log(error);
        // })
    }

    return (
        <main className='responsive-page-sizing'>
           <h1>Add a new event</h1>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Name it something grabby" 
                        size="lg"
                        value={eventName}
                        onChange={(event) => setEventName(event.target.value)}
                    />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="name@example.com" 
                            size="lg" 
                            value={eventDate}
                            onChange={(event) => setEventDate(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Event Time</Form.Label>
                        <Form.Control 
                            type="time" 
                            placeholder="name@example.com" 
                            size="lg"
                            value={eventTime}
                            onChange={(event) => setEventTime(event.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Artists</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Artist 1, Artist 2, etc" 
                        size="lg"
                        value={artists}
                        onChange={(event) => setArtists(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Name of the venue" 
                        size="lg"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control 
                        type="url" 
                        placeholder="Enter a URL" 
                        size="lg"
                        value={photoUrl}
                        onChange={(event) => setPhotoUrl(event.target.value)}
                    />
                </Form.Group>
            </Form>
           <button onClick={handlePostAdminEvent}>post event</button>
        </main>
    );
}
