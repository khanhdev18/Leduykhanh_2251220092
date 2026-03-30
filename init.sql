CREATE DATABASE IF NOT EXISTS taskdb;
USE taskdb;
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
INSERT INTO tasks (title) VALUES ('Làm bài tập DevOps'), ('Push Docker Hub');