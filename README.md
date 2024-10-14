
# Projeto API Serasa (Teste)

Uma simples api RESTFul

### Subir a Aplicação

```bash
  docker-compose up --build
```

### Swagger

```http
  http://localhost:3002/swagger
```
## Documentação da API

#### Autenticação (Não Autenticado)

```http
  POST api/v1/auth/login
```

#### Busca todos os usuários (Autenticado)

```http
  GET api/v1/user
```
#### Busca um usuário (Autenticado)

```http
  GET api/v1/user/{id}
```
#### Inserir um usuário (Autenticado)

```http
  POST api/v1/user
```
```json
{
  "name": "string",
  "idade": 0
}
```
#### Excluir um usuário (Autenticado)

```http
  DELETE api/v1/user/{id}
```

#### Editar um usuário (Autenticado)

```http
  PUT api/v1/user/{id}
```
```json
{
  "name": "string",
  "idade": 0
}
```
