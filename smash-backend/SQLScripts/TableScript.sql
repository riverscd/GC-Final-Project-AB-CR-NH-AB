drop table communities;
drop table events;
drop table replies;
drop table posts;
drop table users;
drop table characters;

create table characters(
id serial PRIMARY KEY,
character_name text NOT NULL
);

create table users(
id serial PRIMARY KEY,
username varchar(15) UNIQUE CHECK(LENGTH(username)>=3),
password char(60) NOT NULL,
first_name varchar(50) CHECK(LENGTH(first_name)>=1),
last_name varchar(50) CHECK(LENGTH(last_name)>=1),
email varchar(50) UNIQUE NOT NULL,
birthdate date,
city varchar(50),
state varchar(2),
country varchar(50),
zip varchar(5),
user_profile_img bytea,
bio text,
added_community_ids int [],
added_event_ids int [],
main_character smallint[],
secondary_characters smallint[],
slippi_usernames varchar(20)[]
);

create table posts(
id serial PRIMARY KEY,
author_id int REFERENCES users ON DELETE CASCADE,
post_title text NOT NULL,
post_message text NOT NULL,
replies int[],
date_created timestamp 
);

create table replies(
id serial PRIMARY KEY,
author_id int REFERENCES users ON DELETE CASCADE,
post_id int REFERENCES posts ON DELETE CASCADE,
message text NOT NULL,
date_created timestamp NOT NULL
);

create table events(
id serial PRIMARY KEY,
creator_id int REFERENCES users ON DELETE CASCADE,
event_name varchar(50) NOT NULL,
attendees int[],
description text,
event_date timestamp NOT NULL,
posts int[],
event_img bytea,
is_in_person boolean,
location text,
address text,
city varchar(30),
state varchar(2),
country varchar(50),
zip varchar(5)
);

create table communities(
id serial PRIMARY KEY,
community_name varchar(50) UNIQUE NOT NULL,
creator_id int,
community_members_id int[],
location text,
posts int[],
community_profile_img bytea,
description text
);

INSERT INTO characters (character_name) values
('Mario'), 
('Luigi'), 
('Yoshi'), 
('Donkey Kong'), 
('Link'), 
('Samus'), 
('Kirby'), 
('Fox'), 
('Pikachu'), 
('Jigglypuff'), 
('Cpt. Falcon'), 
('Ness'), 
('Peach'), 
('Bowser'), 
('Dr. Mario'), 
('Zelda'), 
('Sheik'), 
('Ganondorf'), 
('Young Link'), 
('Falco'), 
('Mewtwo'), 
('Pichu'), 
('Ice Climbers'), 
('Marth'), 
('Roy'), 
('Mr. Game & Watch');

insert into users (username, password, first_name, last_name, email, birthdate, city, state, country, zip, bio, main_character, secondary_characters, slippi_usernames) 
values ('NHamer','pass','Nick','Hamer','nhamer@gmail.com','1991-08-26', 'Lansing', 'MI', 'United States of American', '55555', 'Avid gamer with a passion for programming and learning new stuff', '{23}', '{11}', '{nhamer}');
insert into users (username, password, first_name, last_name, email, birthdate, city, state, country, zip, bio, main_character, secondary_characters, slippi_usernames) 
values ('alifi','pass','Adam','Boeving','adamboeving@gmail.com','1993-07-02', 'Holt', 'MI', 'United States of American', '48842', 'Avid gamer with a passion for programming and learning new stuff',  '{8}', '{6}', '{aalifi}');

insert into communities (community_name, creator_id, community_members_id, location, posts, description) 
values ('Lansing Gamers', 1, '{1}', 'Lansing','{1}','Local to Lansing, looking to play pick up games');
insert into communities (community_name, creator_id, community_members_id, location, posts, description) 
values ('Holt Gamers', 2, '{2}', 'Holt','{2}','Local to Holt, looking to play pick up games');

insert into events (creator_id, event_name, attendees, description, event_date, posts,is_in_person, location, address, city, state, country, zip) 
values (1, 'Smashfest Holt', '{10}', 'Smash Tournament located in Holt', '2022-09-03', '{0}', true, 'Holt', '5555555 cedar st', 'Holt', 'MI', 'United States Of America', '48842');
insert into events (creator_id, event_name, attendees, description, event_date, posts,is_in_person, location, address, city, state, country, zip) 
values (1, 'Smashfest Lansing', '{8}', 'Smash Tournament located in Lansing', '2022-09-03', '{0}', true, 'Lansing', '5555555 Capital Ave', 'Lansing', 'MI', 'United States Of America', '48864');

INSERT INTO posts (author_id, post_title, post_message, date_created) values ('1', 'First!', 'first! lol', '2022-04-13');
INSERT INTO posts (author_id, post_title, post_message, date_created) values ('2', 'Not First', 'not first :(', '2022-04-13');

INSERT INTO replies (author_id, post_id, message, date_created) values ('1', '1', 'testing reply post 1', '2022-04-16');
INSERT INTO replies (author_id, post_id, message, date_created) values ('2', '2', 'testing reply post 2', '2022-04-16');

