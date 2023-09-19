CREATE TABLE IF NOT EXISTS task (
    id bigint PRIMARY KEY,
    title varchar(255) NOT NULL UNIQUE,
    description text,
    deadline timestamp,
    status enum('DRAFT', 'TODO', 'IN PROGRESS', 'DONE') NOT NULL
);