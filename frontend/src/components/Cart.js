import React, { useContext } from "react";
import { Button } from "reactstrap";

import UserContext from "../UserContext";
import CartContext from "../CartContext";
import CartItem from "./CartItem";
import InstanookApi from "../api";

function Cart() {
    const user = useContext(UserContext);
    const cart = useContext(CartContext);

    let total = 0;

    for (let item of cart) {
        total += item.price;
    }

    async function handlePurchase(evt) {
        evt.preventDefault();
        for (let item of cart) {
            console.log(item)
            item.buyerId = user.id;
            await InstanookApi.sell(item);
        }
        window.location.reload();

    }

    return (
        <div>
            {cart.length > 0 ? cart.map(item => (
                <CartItem
                    key={item.cartId}
                    id={item.cartId}
                    itemName={item.itemName}
                    itemFileName={item.itemFileName}
                    itemType={item.itemType}
                    price={item.price}
                />
            ))
                : <p>Your cart is empty!</ p>
            }
            <p>Total: {total} bells</p>
            {cart.length > 0 ? <Button color="primary" onClick={handlePurchase}> Purchase!</Button> : ""}
        </div >
    )

}

export default Cart;