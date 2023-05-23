import React, { useState } from "react";
import { Button } from "reactstrap";

function SearchForm({ fetchData }) {
    const [search, setSearch] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        fetchData(search);
    };

    const handleChange = e => {
        setSearch(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="Search"
                onChange={handleChange}>
            </input>
            <Button size="sm" type="submit">Search!</Button>
        </form>
    )
}

export default SearchForm;