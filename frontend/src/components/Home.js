import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

function Home() {
    const user = useContext(UserContext);

    return (
        <div>
            {user ? <p>Hello, {user.username}!</p> :
                <div>
                    <p>Signup or Login to utilize Instanook!</p>
                    <button><Link to="/signup">Signup!</Link></button>
                    <button><Link to="/login">Login</Link></button>
                </div>}
        </div>
    )
}

export default Home;