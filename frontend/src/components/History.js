import React, { useContext, useEffect, useState } from "react";

import InstanookApi from "../api";
import UserContext from "../UserContext";
import Listing from "./Listing";

function History() {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState("");
    const user = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true);
        async function getHistory() {
            try {
                let res = await InstanookApi.getHistory(user.username);
                setListings(res);
                setIsLoading(false);
            }
            catch (e) {
                return e;
            }
        };
        getHistory();
    }, [user.username]);


    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <h1>Past Purchases</h1>
            {listings.map(listing => (
                <Listing
                    key={listing.id}
                    id={listing.id}
                    username={listing.username}
                    itemName={listing.itemName}
                    itemFileName={listing.itemFileName}
                    itemType={listing.itemType}
                    price={listing.price}
                    timePosted={listing.timePosted}
                    timeSold={listing.timeSold}
                    listingType={listing.listingType}
                />
            ))}
        </div>
    )
}

export default History;