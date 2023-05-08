-- both test users have the password 'password'

INSERT INTO users (id, username, password, email, friend_code)
VALUES (1,
        'testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test1@test.com',
        'SW-1111-1111-1111'),
        (2,
        'testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test2@test.com',
        'SW-2222-2222-2222');

INSERT INTO items (id, file_name, type, name)
VALUES (1,
        'ant00',
        'villagers',
        'Cyrano'),
        (2,
        'common_butterfly',
        'bugs',
        'common butterfly'),
        (3,
        'bitterling',
        'fish',
        'bitterling');

INSERT INTO listings (id, user_id, item_id, price, time_sold)
VALUES (1,
        1,
        1,
        100000, null),
        (2,
        1,
        2,
        500, CURRENT_TIMESTAMP),
        (3,
        2,
        3,
        250, null);

INSERT INTO user_listings (id, user_id, listing_id, listing_type)
VALUES (1, 1, 1, 'curr'),
        (2, 1, 2, 'sold'),
        (3, 2, 2, 'bought'),
        (4, 2, 3, 'curr'),
        (5, 1, 3, 'cart');