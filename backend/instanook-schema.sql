/* items table
file_name: used to make requests to ACNH API. Format in API is v1/{type}/{file_name}
type: will be used via ACNH API to make requests.
Types include fish, bugs, art, fossils, villagers
*/
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    file_name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    friend_code TEXT NOT NULL
);

CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    item_id INTEGER
        REFERENCES items ON DELETE CASCADE,
    price INTEGER CHECK (price >= 0),
    time_posted TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    time_sold TIMESTAMP
        DEFAULT NULL
);

/* user_listings table
curr: user's current listings for sale
cart: listings in the user's cart 
sold: listings the user has sold
bought: listings the user has bought
*/

CREATE TABLE user_listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    listing_id INTEGER
        REFERENCES listings ON DELETE CASCADE,
    listing_type TEXT NOT NULL
);
