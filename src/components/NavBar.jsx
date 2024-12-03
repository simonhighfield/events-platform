import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../Contexts"

export default function NavBar () {
    const { profile } = useContext(ProfileContext)
    
    return(
        <nav style={{backgroundColor: 'grey'}}>
            <h1>NavBar.jsx</h1>
            <Link to={`/`}>Home</Link><span> </span>
            <Link to={`login`}>login</Link>
            {profile ? (<p>signed in as {profile.username}</p>) : <p>not signed in</p>}
        </nav>
    )
}