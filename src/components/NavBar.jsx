import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import "./NavBar.css"

export default function NavBar() {
    const { profile } = useContext(ProfileContext)

    return (
        <Nav className="NavBar responsive-page-sizing sticky-top justify-content-between align-items-center">
            <Nav.Item>
                <Link to={`/`}>
                <Image src="/whatsOnLogoV4.png" className="h-100 img-fluid d-block" style={{maxHeight: "70px"}} />
                </Link><span> </span>
            </Nav.Item>
            <Nav.Item>
                <Link to={`profile`}>Profile</Link><span> </span>
            </Nav.Item>
        </Nav>
    )
}