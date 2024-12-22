import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"
import Nav from 'react-bootstrap/Nav';
import "./Footer.css"

export default function Footer () {
    const { profile } = useContext(ProfileContext)
    
    return(
        <Nav className="Footer responsive-page-sizing justify-content-between sticky-bottom">
            <Nav.Item>
                <Link to={`/`}>Home</Link>
            </Nav.Item>

            {profile && profile.is_admin ? 
                <Nav.Item>
                    <Link to={`add-event`}>Add Event</Link>
                </Nav.Item>
            : 
                null
            }

            <Nav.Item>
                <Link to={`saved-events`}>Saved Events</Link>
            </Nav.Item>
        </Nav>
    )
}