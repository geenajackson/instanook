import React, { useState, useEffect } from "react";

import InstanookApi from "../api";
import SearchForm from "../forms/SearchForm";
import Listing from "./Listing";

function ListingList() {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState([]);

    async function fetchData() {
        setIsLoading(true);
        async function getListings() {
            let listings = await InstanookApi.getListings("listingType", "curr");
            setListings(listings);
            setIsLoading(false);
        };
        getListings();
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div>
            <SearchForm fetchData={fetchData} />
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
                ></Listing>
            ))}
        </div>
    )
}

export default ListingList;