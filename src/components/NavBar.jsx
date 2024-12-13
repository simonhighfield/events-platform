import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"
import Nav from 'react-bootstrap/Nav';
import "./NavBar.css"


export default function NavBar() {
    const { profile } = useContext(ProfileContext)

    return (
        <Nav className="NavBar responsive-page-sizing justify-content-between">
            <Nav.Item>
                <Link to={`/`}>Home</Link><span> </span>
            </Nav.Item>
            <Nav.Item>
                <Link to={`login`}>profile</Link><span> </span>
            </Nav.Item>
        </Nav>
    )
}