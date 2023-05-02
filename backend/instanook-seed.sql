-- both test users have the password "password"

INSERT INTO users (id, username, password, email, friend_code)
VALUES ('1',
        'testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test1@test.com',
        'SW-1111-1111-1111'),
        ('2',
        'testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test2@test.com',
        'SW-2222-2222-2222');

INSERT INTO items (id, file_name, type, name)
VALUES ('1',
        'ant00',
        'villagers',
        'Cyrano'),
        ('2',
        'common_butterfly',
        'bugs',
        'common butterfly'),
        ('3',
        'bitterling',
        'fish',
        'bitterling');

INSERT INTO listings (user_id, item_id, price)
VALUES ('1',
        '1',
        100000),
        ('1',
        '2',
        500),
        ('2',
        '3',
        250)