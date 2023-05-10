import { useEffect } from "react";
import { useHistory } from "react-router-dom";


function Logout({ logoutUser }) {
    const history = useHistory();

    useEffect(() => {
        logoutUser();
        history.push("/")
    });

    return
}

export default Logout;