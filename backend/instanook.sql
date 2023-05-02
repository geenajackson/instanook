-- set up db and test db for instanook

\echo 'Delete and recreate instanook db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE instanook;
CREATE DATABASE instanook;
\connect instanook

\i instanook-schema.sql
\i instanook-seed.sql

\echo 'Delete and recreate instanook_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE instanook_test;
CREATE DATABASE instanook_test;
\connect instanook_test

\i instanook-schema.sql
