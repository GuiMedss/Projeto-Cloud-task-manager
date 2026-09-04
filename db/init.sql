CREATE DATABASE IF NOT EXISTS task_manager;

CREATE USER IF NOT EXISTS 'task_user'@'192.168.57.%' IDENTIFIED BY 'task_password';
GRANT ALL PRIVILEGES ON task_manager.* TO 'task_user'@'192.168.57.%';
FLUSH PRIVILEGES;

USE task_manager;

-- Tabelas reais do projeto devem ser criadas durante a implementacao da aplicacao.
