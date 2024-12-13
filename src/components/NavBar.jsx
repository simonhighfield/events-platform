import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"
import Nav from 'react-bootstrap/Nav';
import "./NavBar.css"


export default function NavBar() {
    const { profile } = useContext(ProfileContext)

    return (
        // <nav style={{backgroundColor: 'grey'}}>
        //     <h1>NavBar.jsx</h1>
        //     <Link to={`/`}>Home</Link><span> </span>
        //     <Link to={`login`}>login</Link>
        //     {profile ? (<p>signed in as {profile.username}</p>) : <p>not signed in</p>}
        // </nav>

        <Nav className="justify-content-between">
            <Nav.Item>
                <Link to={`/`}>Home</Link><span> </span>
            </Nav.Item>
            <Nav.Item>
                <Link to={`login`}>profile</Link><span> </span>
            </Nav.Item>
        </Nav>
    )
}