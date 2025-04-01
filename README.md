# Agência de Viagens - API com Node.js e MySQL

Este projeto é uma aplicação simples para gerenciar viagens utilizando Node.js, Express e MySQL. A aplicação permite cadastrar, listar e visualizar viagens de uma agência de turismo.

## 📌 Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para JavaScript
- **Express.js**: Framework web para criação de servidores
- **MySQL**: Banco de dados relacional para armazenar informações das viagens
- **Body-Parser**: Middleware para interpretar corpos de requisições
- **HTML + CSS**: Interface básica para interação com o usuário

## 📋 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## 🚀 Configuração do Banco de Dados
1. Crie um banco de dados chamado `agencia_viagens` no MySQL.
2. Execute o seguinte comando SQL para criar a tabela:

```sql
CREATE TABLE viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destino VARCHAR(255) NOT NULL,
    data_viagem DATE NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    vagas INT NOT NULL
);
```
3. Configure a conexão no código, alterando as credenciais no trecho:

```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'agencia_viagens',
    port: 3306
});
```
## 4- Crie uma pasta chamada public, para poder conectar o css.

- Crie uma nova pasta chama public dentro da pasta Agencia_viagens.
- Ou altere no HTML. href /style.css que esta dentro da pasta public.
```<link rel="stylesheet" href="/style.css">```

## ▶️ Como Executar o Projeto
1. Clone o repositório:
```sh
git clone https://github.com/seuusuario/agencia-viagens.git
```
2. Acesse a pasta do projeto:
```sh
cd agencia-viagens
```
3. Instale as dependências:
```sh
npm install
```
4. Inicie o servidor:
```sh
node server.js
```
5. Acesse a aplicação em [http://localhost:8083](http://localhost:8083)

## 🔧 Rotas Disponíveis
### 📌 Cadastrar Viagem
- **Rota:** `POST /viagens`
- **Descrição:** Adiciona uma nova viagem ao banco de dados.
- **Body da requisição (JSON):**
```json
{
    "destino": "Rio de Janeiro",
    "data_viagem": "2024-12-15",
    "preco": 1500.00,
    "vagas": 20
}
```

### 📌 Listar Viagens
- **Rota:** `GET /listar`
- **Descrição:** Retorna todas as viagens cadastradas em uma página HTML estilizada.

### 📌 Página Inicial
- **Rota:** `GET /`
- **Descrição:** Página HTML inicial com formulário para cadastrar viagens e listar viagens cadastradas.

---
Criado por Jonathan Felipe para simplificar o seu gerenciamento de viagens! ✈️

