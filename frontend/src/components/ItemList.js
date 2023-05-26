import React, { useState, useEffect, useContext } from "react";

import InstanookApi from "../api";
import SearchForm from "../forms/SearchForm";
import Item from "./Item";
import UserContext from "../UserContext";

function ItemList() {
    const user = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    async function createListing(data) {
        try {
            console.log("in itemlist", data)
            let res = await InstanookApi.createListing(user.id, data);
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    async function fetchData(query = undefined) {
        setIsLoading(true);
        async function getItemsByName() {
            let items = await InstanookApi.getItemsByName(query);
            setItems(items);
            setIsLoading(false);
        };
        getItemsByName();
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
            {items.map(item => (
                <Item
                    key={item.id}
                    id={item.id}
                    fileName={item.fileName}
                    type={item.type}
                    name={item.name}
                    createListing={createListing}
                ></Item>
            ))}
        </div>
    )
}

export default ItemList;