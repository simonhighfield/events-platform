import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import { ProfileContext } from '../Contexts'
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';


export default function HelloProfile () {
    const { session } = useContext(SessionContext);
    const { profile } = useContext(ProfileContext);

    return (
        <>
            {profile 
                ? <Container className='d-flex' style={{marginBottom: '0.5rem', gap: '0.5rem', padding: 0}}>
                    <span>Hello {profile.username}</span>
                    {profile.is_admin && <Badge bg="info" >Admin</Badge>}
                </Container>
                : <p>Sign in to save events and add them to your Google Calendar</p>
            }
        </>
    )
}