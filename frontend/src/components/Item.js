import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Form, Label, Input, Button } from "reactstrap"



function Item({ id, fileName, type, name, createListing }) {
    const INITIAL_STATE = { itemId: id, price: 0 }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();
    const imageSrc = `http://acnhapi.com/v1/images/${type}/${fileName}`

    async function handleSubmit(evt) {
        evt.preventDefault();
        await createListing(formData);
        history.push("/listings")
    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <Card color="light" className="Card">
            <CardBody>
                <img alt={name} src={imageSrc} width="25%" height="25%" />
                <CardTitle tag="h3">{name}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Type: {type}</ListGroupItem>
                </ListGroup>
                <Form onSubmit={handleSubmit}>
                    <Input
                        id="itemId"
                        name="itemId"
                        type="hidden"
                        value={id}
                        onChange={handleChange}
                    ></Input>
                    <Label htmlFor="price">Price: </Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    ></Input>
                    <Button type="submit">Create Listing!</Button>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Item;