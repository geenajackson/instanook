import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "reactstrap"
import moment from "moment";

import InstanookApi from "../api";


function ListingDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState("");

    const datePosted = moment(details.timePosted, "YYYY-MM-DDTHH:mm").format("l h:mma");

    let { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        async function getListing() {
            try {
                let res = await InstanookApi.getListing(id);
                setDetails(res);
                setIsLoading(false);
            }
            catch (e) {
                return e;
            }
        };
        getListing();
    }, [id]);


    // async function addToCart(jobId) {
    //     try {
    //         let res = await InstanookApi.applyUser(user.username, jobId);
    //         console.log(res)
    //         window.location.reload();

    //     }
    //     catch (e) {
    //         return e;
    //     }

    // }

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    // if (!user) {
    //     return <Redirect to="/" />
    // }
    return (
        <Card color="info">
            <CardBody>
                <img alt={details.name} src={`http://acnhapi.com/v1/images/${details.item.type}/${details.item.fileName}`} width="25%" height="25%" />
                <CardTitle tag="h2">{details.name}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Price: {details.price}</ListGroupItem>
                    <ListGroupItem>Seller: {details.username}</ListGroupItem>
                    <ListGroupItem>Time Posted: {datePosted}</ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    )
}

export default ListingDetails;