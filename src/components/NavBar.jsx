import { Link } from "react-router-dom"

export default function NavBar () {
    return(
        <nav style={{backgroundColor: 'grey'}}>
            <h1>NavBar.jsx</h1>
            <Link to={`/`}>Home</Link><span> </span>
            <Link to={`login`}>login</Link>
        </nav>
    )
}