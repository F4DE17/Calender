
-- @block
CREATE TABLE event(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    calender_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    name LONGTEXT NOT NULL,
    description LONGTEXT NOT NULL,
    date DATE NOT NULL,
    remind TINYINT(1) NOT NULL,
    created_at DATETIME NOT NULL,
    birthday TINYINT(1) NOT NULL
);

-- @block
CREATE TABLE shared_event(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    calender_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    orgin_user_id BIGINT NOT NULL
);

-- @block
CREATE TABLE calender(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL
);

-- @block
CREATE TABLE user(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email LONGTEXT NOT NULL,
    password LONGTEXT NOT NULL,
    group_id BIGINT NULL,
    premium TINYINT(1) NOT NULL,
    birthday DATE NULL
);

-- @block
CREATE TABLE group(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name LONGTEXT NOT NULL,
    description LONGTEXT NOT NULL
);


-- @block
ALTER TABLE
    calender ADD CONSTRAINT calender_user_id_foreign FOREIGN KEY(user_id) REFERENCES user(id);
ALTER TABLE
    shared_event ADD CONSTRAINT shared_event_orgin_user_id_foreign FOREIGN KEY(orgin_user_id) REFERENCES event(user_id);
ALTER TABLE
    event ADD CONSTRAINT event_calender_id_foreign FOREIGN KEY(calender_id) REFERENCES calender(id);
ALTER TABLE
    shared_event ADD CONSTRAINT shared_event_event_id_foreign FOREIGN KEY(event_id) REFERENCES event(id);
ALTER TABLE
    shared_event ADD CONSTRAINT shared_event_calender_id_foreign FOREIGN KEY(calender_id) REFERENCES calender(id);
ALTER TABLE
    user ADD CONSTRAINT user_group_id_foreign FOREIGN KEY(group_id) REFERENCES group(id);
ALTER TABLE
    calender ADD CONSTRAINT calender_user_id_foreign FOREIGN KEY(user_id) REFERENCES event(user_id);

-- @block
INSERT INTO user (email, password, premium)
VALUES
    ("abc@gmail.com", "abc!", true),
    ("bcd@gmail.com", "bcd!", false);

-- @block
SELECT * FROM user;

-- UPDATE user SET email = "abc@test.com" WHERE premium = true;

-- @block
SELECT * FROM user WHERE email = "abc@test.com";