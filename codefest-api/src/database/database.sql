DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS follower;
DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS user_groups;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user_event;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS rate;
DROP TABLE IF EXISTS message_users;
DROP TABLE IF EXISTS message_group;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    cel VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role INT NOT NULL
);

CREATE TABLE follower (
    user_id UUID NOT NULL,
    follower_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id)
);

CREATE TABLE friend (
    user_id UUID NOT NULL,
    friend_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);

CREATE TABLE groups (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    rate DECIMAL NOT NULL,
    rate_cont INT NOT NULL,
    rate_acu DECIMAL NOT NULL,
    created_date TIMESTAMP NOT NULL
);

CREATE TABLE user_groups (
    user_id UUID NOT NULL,
    groups_id UUID NOT NULL,
    rol INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (groups_id) REFERENCES groups(id)
);

CREATE TABLE event (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    location VARCHAR(50) NOT NULL,
    creator_id UUID NOT NULL,
    created_date TIMESTAMP NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    groups_id TEXT[],
    urlEvent VARCHAR(100) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE user_event (
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE comment (
    id UUID NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE question (
    id UUID NOT NULL,
    question TEXT NOT NULL,
    created_date TIMESTAMP NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE rate (
    user_id UUID NOT NULL,
    groups_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (groups_id) REFERENCES groups(id)
);

CREATE TABLE message_users (
    id UUID NOT NULL,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    content TEXT,
    created_date TIMESTAMP NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE message_group (
    id UUID NOT NULL,
    group_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    content TEXT,
    created_date TIMESTAMP NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

