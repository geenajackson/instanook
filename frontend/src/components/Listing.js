import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"


function Listing({ id, itemName, itemFileName, itemType, price, timePosted, timeSold }) {
    const history = useHistory();
    const imageSrc = `http://acnhapi.com/v1/images/${itemType}/${itemFileName}`
    const listingUrl = `listings/${id}`

    async function handleSubmit(evt) {
        evt.preventDefault();
        history.push("/listings")
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
                <Button color="primary" onClick={handleSubmit}>Listing!</Button>
            </CardBody>
        </Card>
    )
}

export default Listing;