-- @block

-- CALENDER TABLES

CREATE TABLE `Groups` (
    `id` INT AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `description` TEXT,

    PRIMARY KEY(`id`)
);

CREATE TABLE `Users`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,

    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,

    `group_id` BIGINT NOT NULL,

    `premium` TINYINT(1) NOT NULL DEFAULT 0,
    `birthday` DATE NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Calenders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    
    PRIMARY KEY (id),
);

CREATE TABLE `Events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `calender_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `name` TEXT NOT NULL,
    `description` TEXT,
    `date` DATE NOT NULL,
    `remind` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` BIGINT,
    `birthday` TINYINT(1) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`calender_id`) REFERENCES `Calenders`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

CREATE TABLE `Shared_Events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `calender_id` BIGINT NOT NULL,
    `event_id` BIGINT NOT NULL,
    `orgin_user_id` BIGINT NOT NULL,
    `shared_date` DATE NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`calender_id`) REFERENCES `Calenders`(`id`),
    FOREIGN KEY (`event_id`) REFERENCES `Events`(`id`)
);

-- @block

-- PERMISSIONS TABLES

CREATE TABLE `Authorization_Levels` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `hash` TEXT
);

CREATE TABLE `Permissions` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `auth_id` INT NOT NULL,
    `table` TEXT NOT NULL,
    `columns` TEXT NOT NULL,
    `rows` TEXT NOT NULL,

    FOREIGN KEY (`auth_id`) REFERENCES `Authorization_Levels`(`id`)
);

-- SCRIPT AREA
-- @block
SELECT * FROM authorization_levels;
-- @block 
INSERT INTO `Permissions` (`auth_id`, `table`, `columns`, `rows`)
VALUES
(3, "Groups", "name, description", "own"),
(3, "Users", "email, password, firstname, lastname, group_id, birthday", "own"),
(3, "Events", "name, description, date, remind, birthday", "own");

-- @block
SELECT * FROM permissions AS p
JOIN authorization_levels AS a ON a.id = p.auth_id
HAVING p.table = "Groups";

-- @block
INSERT INTO Users (email, password, firstname, lastname, group_id, premium)
VALUE ("z", "z", "z", "z", 1, 1);
-- @block
INSERT INTO Calenders (user_id)
VALUE (1)
-- @block
SELECT * FROM permissions WHERE permissions.table = "Groups";