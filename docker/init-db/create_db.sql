-- Criando o banco de dados
CREATE DATABASE "test-serasa";

\c "test-serasa";

-- Criando a tabela user
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
