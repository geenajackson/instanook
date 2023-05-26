import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"

import InstanookApi from "../api";
import CartContext from "../CartContext";


function CartItem({ id, itemName, itemFileName, itemType, price }) {
    const cart = useContext(CartContext);
    const imageSrc = `http://acnhapi.com/v1/images/${itemType}/${itemFileName}`
    const listingUrl = `listings/${id}`

    async function removeFromCart(evt) {
        evt.preventDefault();
        await InstanookApi.removeFromCart(cart.find(c => c.cartId === id).cartId);
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
                </ListGroup>
                <Button color="secondary" onClick={removeFromCart}>Remove</Button>
            </CardBody>
        </Card>
    )
}

export default CartItem;