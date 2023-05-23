import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"


function Item({ id, fileName, type, name }) {
    const history = useHistory();
    const imageSrc = `http://acnhapi.com/v1/images/${type}/${fileName}`
    async function handleSubmit(evt) {
        evt.preventDefault();
        history.push("/listings")
    }

    return (
        <Card color="light" className="Card">
            <CardBody>
                <img alt={name} src={imageSrc} width="25%" height="25%" />
                <CardTitle tag="h3">{name}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Type: {type}</ListGroupItem>
                </ListGroup>
                <Button color="primary" onClick={handleSubmit}>Item!</Button>
            </CardBody>
        </Card>
    )
}

export default Item;