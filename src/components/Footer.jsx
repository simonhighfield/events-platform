import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"
import Nav from 'react-bootstrap/Nav';
import "./Footer.css"

export default function Footer () {
    return(
        // <h1>Footer.jsx</h1>
        <Nav className="Footer responsive-page-sizing justify-content-between sticky-bottom">
        <Nav.Item>
            <Link to={`/`}>Home</Link><span> </span>
        </Nav.Item>
        <Nav.Item>
            <Link to={`login`}>profile</Link><span> </span>
        </Nav.Item>
    </Nav>
    )
}