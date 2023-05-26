import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"

import InstanookApi from "../api";
import UserContext from "../UserContext";
import CartContext from "../CartContext";


function Listing({ id, itemName, itemFileName, itemType, price, timePosted, timeSold }) {
    const user = useContext(UserContext);
    const cart = useContext(CartContext);
    const imageSrc = `http://acnhapi.com/v1/images/${itemType}/${itemFileName}`
    const listingUrl = `listings/${id}`

    async function addToCart(evt) {
        evt.preventDefault();
        await InstanookApi.addToCart(id, user.id);
        window.location.reload();
    }

    async function removeFromCart(evt) {
        evt.preventDefault();
        await InstanookApi.removeFromCart(cart.find(c => c.listingId === id).cartId);
        window.location.reload();
    }

    return (
        <Card color="light" className="Card">
            <CardBody>
                <CardTitle tag="h3">
                    <Link to={listingUrl}>
                        <img alt={itemName} src={imageSrc} width="25%" height="25%" />
                        {itemName}
                    </Link></CardTitle>
                <ListGroup>
                    <ListGroupItem>Price: {price}</ListGroupItem>
                    <ListGroupItem>Time Posted: {timePosted}</ListGroupItem>
                    {timeSold ? <ListGroupItem>Time Sold: {timeSold}</ListGroupItem> : ""}
                </ListGroup>
                {cart.find(c => c.listingId === id) ? <Button color="secondary" onClick={removeFromCart}>In Cart!</Button> :
                    <Button color="primary" onClick={addToCart}>Add to Cart</Button>}
            </CardBody>
        </Card>
    )
}

export default Listing;