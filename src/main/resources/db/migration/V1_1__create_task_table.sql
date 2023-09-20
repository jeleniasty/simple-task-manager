CREATE TABLE IF NOT EXISTS task (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL UNIQUE,
    description text,
    deadline timestamp NOT NULL,
    status enum('TODO', 'IN_PROGRESS', 'DONE') NOT NULL
);