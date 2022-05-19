CREATE DATABASE pets;

USE pets;

CREATE TABLE dogs(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    INDEX (name)
);

<<<<<<< HEAD
CREATE TABLE cats(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    INDEX (name)
);
=======
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    INDEX (username)
);
INSERT INTO users (username, password) VALUES ('admin', 'admin');
>>>>>>> e0536e7e8f8b5f0cf8a82865212df0e6cab5cd36
