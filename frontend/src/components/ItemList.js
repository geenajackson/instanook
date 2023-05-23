import React, { useState, useEffect } from "react";

import InstanookApi from "../api";
import SearchForm from "../forms/SearchForm";
import Item from "./Item";

function ItemList() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

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
                ></Item>
            ))}
        </div>
    )
}

export default ItemList;