import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import ListingList from "./ListingList";
import { Button } from "reactstrap";

import "../styles/Home.css"

function Home() {
    const user = useContext(UserContext);

    return (
        <div>
            {user ? <p>Hello, {user.username}!
                <ListingList></ListingList></p> :
                <div>
                    <p>Signup or Login to utilize Instanook!</p>
                    <Button><Link to="/signup">Signup!</Link></Button>
                    <Button><Link to="/login">Login</Link></Button>
                </div>}
        </div>
    )
}

export default Home;