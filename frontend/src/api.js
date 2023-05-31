import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**API Class.
 * 
 * Methods used to interact with the backend API.
 * 
 */

class InstanookApi {
    //this is the stored token used within the App.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        //generic request method to interact with API.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${InstanookApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        }
        catch (e) {
            console.error("API Error:", e.response);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        }
    }

    //Auth Routes

    //user data is username, password, email, friendCode
    static async register(user) {
        let res = await this.request(`auth/register`, {
            username: user.username,
            password: user.password,
            email: user.email,
            friendCode: user.friendCode
        }, "post");
        return res;
    }

    //user data is username, password
    static async login(user) {
        let res = await this.request(`auth/login`, { username: user.username, password: user.password }, "post");
        InstanookApi.token = res.token;
        return res;
    }

    static logout() {
        console.log("logged out!")
        InstanookApi.token = null;
    }

    //User Routes
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    //Item Routes
    static async getItem(name) {
        let res = await this.request(`items/${name}`);
        return res.item;
    }

    static async getItemsByName(name) {
        let res = await this.request(`items/search/${name}`);
        return res.items;
    }

    static async getItemsByType(type) {
        let res = await this.request(`items/${type}`);
        return res.items;
    }

    //Listing Routes
    static async createListing(userId, data) {
        let res = await this.request(`listings/`, {
            userId: userId,
            itemId: data.itemId,
            price: data.price
        }, "post");
        return res.listing;
    }

    static async getListing(id) {
        let res = await this.request(`listings/${id}`);
        return res.listing;
    }

    static async getListings(query, value) {
        let res = await this.request(`listings/`, { [query]: value });
        return res.listings;
    }

    static async getHistory(username) {
        let res = await this.request(`listings/`, {
            username: username,
            listingType: "bought"
        });
        return res.listings;
    }

    static async addToCart(listingId, userId) {
        let res = await this.request(`listings/cart/${userId}/${listingId}`, {}, "post");
        return res.cart;
    }

    static async removeFromCart(cartId) {
        let res = await this.request(`listings/cart/${cartId}`, {}, "delete");
        return res.cart;
    }

    static async sell(listing) {
        console.log(listing)
        let res = await this.request(`listings/cart/sell`, {
            listingId: listing.listingId,
            sellerId: listing.sellerId,
            buyerId: listing.buyerId
        }, "patch");
        console.log(res)
        return res;
    }


}



export default InstanookApi;