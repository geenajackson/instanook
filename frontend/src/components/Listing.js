import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"
import moment from "moment";

import InstanookApi from "../api";
import UserContext from "../UserContext";
import CartContext from "../CartContext";

import "../styles/Card.css"


function Listing({ id, itemName, itemFileName, itemType, price, timePosted, timeSold, listingType }) {
    const user = useContext(UserContext);
    const cart = useContext(CartContext);
    const imageSrc = `http://acnhapi.com/v1/images/${itemType}/${itemFileName}`
    const listingUrl = `listings/${id}`

    const datePosted = moment(timePosted, "YYYY-MM-DDTHH:mm").format("l h:mma");
    const dateSold = moment(timeSold, "YYYY-MM-DDTHH:mm").format("l h:mma");

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
                    <Link className="Card" to={listingUrl}>
                        <img alt={itemName} src={imageSrc} width="25%" height="25%" />
                        {itemName}
                    </Link></CardTitle>
                <ListGroup>
                    <ListGroupItem>Price: {price} bells</ListGroupItem>
                    <ListGroupItem>Time Posted: {datePosted}</ListGroupItem>
                    {timeSold ? <ListGroupItem>Time Sold: {dateSold}</ListGroupItem> : ""}
                </ListGroup>
                {listingType === "bought" ? "" :
                    cart.find(c => c.listingId === id) ? <Button color="secondary" onClick={removeFromCart}>In Cart!</Button> :
                        <Button color="primary" onClick={addToCart}>Add to Cart</Button>}
            </CardBody>
        </Card>
    )
}

export default Listing;