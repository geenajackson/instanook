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
        return res;
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
    static async getListing(id) {
        let res = await this.request(`listings/${id}`);
        return res.listing;
    }

    static async getListings(query, value) {
        let res = await this.request(`listings/`, { [query]: value });
        return res.listings;
    }


}



export default InstanookApi;