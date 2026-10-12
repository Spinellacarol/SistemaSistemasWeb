# Pesquisa — Autenticação, Autorização e JWT

**Grupo:** [nome 1], [nome 2], [nome 3] · 3º AI · ETECAMP
**Tema:** Lista de Tarefas

## A. Fundamentos

### 1. Autenticação × autorização
[resposta aqui]

### 2. Stateful × stateless
[resposta aqui]

### 3. Hash × criptografia × encoding
[resposta aqui]

### 4. bcrypt e salt
[resposta aqui]

## B. JWT

### 5. Estrutura
O JWT se divide em 3 partes, que são separadas por ponto. O Header, o Payload e a Assinatura, onde o Header informa o algoritmo usado e o tipo do token, o Payload é responsável por carregar as informações do usuário, no caso o role, iat, exp e sub e a Assinatura serve para garantir que ninguém altere o conteúdo sem que o token seja invalidado.

![Token decodificado no jwt.io](docs/jwt-decodificado.png)

Header decodificado:

```json
{ "alg": "HS256", "typ": "JWT" }
```

Payload decodificado:

```json
{ "role": "USER", "iat": 1790686212, "exp": 1790689812, "sub": "1" }
```

### 6. Claims

**O que significam:**
- `sub` (subject): trata-se do id do usuário, que serve para que o servidor saiba quem está pedindo e se a tarefa pertence a essa pessoa. Esse id vem do token..

- `iat` (issued at): trata-se do momento em que foi criado o token, sendo colocado pela biblioteca jsonwebtoken de forma automática, quando chamamos jwt.sign. OBS: com iat e exp é possível calcular o tempo de vida do token (exp - iat).

- `exp` (expiration): define o tempo de validade do token. Ele não é escrito à mão, mas sai do expiresIn, que vem do .env (JWT_EXPIRES_IN). No nosso caso, usamos 3600 segundos, que são 1 hora. Após isso, o jwt.verify recusa o token e é necessário fazer login novamente.

**Quais claims o grupo colocou e por quê:**

```js
const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
  subject: String(user.id),
  expiresIn: process.env.JWT_EXPIRES_IN,
});
```

- `role`: pois o servidor precisa saber se quem pediu é o USER ou é o ADMIN, tendo o role dentro do token, o autorizar decide se libera ou não a rota sem que seja necessário buscar o usuário no banco de dados a cada requisição.

- `sub`: utilizado para saber quem é a pessoa, por meio do seu id.

- `exp`: foi criado pelo expiresIn, mencionado anteriormente, que está no arquivo .env, sendo programado como 3600 segundos, ou seja, 1 hora.

- `iat`: é adicionado automaticamente pela biblioteca.

**Payload do jwt.io:**

```json
{ "role": "USER", "iat": 1790686212, "exp": 1790689812, "sub": "1" }
```

**O que não deve ir no payload:**
Não devem ser colocados no payload nem a senha e nem dados sensíveis, visto que ele não é criptografado e qualquer pessoa pode ler.

### 7. Assinatura
[resposta aqui]

### 8. Validade e logout
[resposta aqui]

## C. Segurança na prática

### 9. Onde guardar o token
[resposta aqui]

### 10. Chave secreta
[resposta aqui]

### 11. RBAC e dono do recurso
[resposta aqui]

### 12. OWASP
[resposta aqui]

## Referências
1.
2.
3.
4.