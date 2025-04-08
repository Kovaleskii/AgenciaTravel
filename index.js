const express = require('express'); // framework web para node.js - criar servidor 
const app = express(); // instancia o express
const mysql = require('mysql2'); // biblioteca para conexão com o banco de dados
const bodyParser = require("body-parser"); // middleware para análise de corpos de requisição

app.use(express.static('public'));


// configurando a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', //endereço do banco de dados
    user: 'root', //nome usuário do banco
    password: 'root', //senha do banco de dados
    database: 'agencia_viagens', // nome do banco de dados
    port: 3306  // porta do banco de dados
});

//estabelece conexão com o banco de dados e emite uma mensagem mostrando seu status
connection.connect(function(err){
    if(err){
        console.error("Erro", err);
        return
    } console.log("Conexão OK! ")
});

//Middleware para análise de corpos de requisição
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Rota para cadastrar viagens
app.post('/viagens', (req, res) => {
    const {destino, data_viagem, preco, vagas } = req.body;
    const sql = 'INSERT INTO viagens (destino, data_viagem, preco, vagas) VALUES (?, ?, ?, ?)';
    connection.query(sql, [destino, data_viagem, preco, vagas], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar viagem.');
        } else {
            res.send('Viagem cadastrada com sucesso!');
        }
    });
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/home.html") 
});


// Rota para listar viagens

        app.get('/listar', function(req, res){
            const listar = "select * from viagens";
        
            connection.query(listar, function(err, rows){
                if(!err){
                    console.log("Cadastro realizado com sucesso ! ")
                    res.send(`
            <html>
                    <head> 
                        <title> Relatório de viagens </title>

                        <style>
                        /* Reset e Configurações Gerais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #e0f7fa, #fff);
  transition: 0.4s ease;
  padding: 2rem;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #006064;
  animation: fadeIn 1s ease;
}

/* Toggle Dark Mode */
.toggle-mode {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
}

.toggle-mode i {
  font-size: 1.8rem;
  cursor: pointer;
  color: #006064;
}

/* Estilizando a Tabela */
.table-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow-x: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeInUp 1s ease;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  background: #00acc1;
  color: white;
}

thead th {
  padding: 12px;
  text-transform: uppercase;
}

tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background 0.3s;
}

tbody tr:hover {
  background: #f1f1f1;
}

td {
  padding: 12px;
}

/* Botão de Ação */
.action-btn {
  background: #00acc1;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #007c91;
}

/* Dark Mode */
body.dark {
  background: #121212;
  color: #f1f1f1;
}

body.dark h1 {
  color: #00e5ff;
}

body.dark .toggle-mode i {
  color: #00e5ff;
}

body.dark .table-container {
  background: rgba(30, 30, 30, 0.7);
  color: #fff;
  border: 1px solid #333;
}

body.dark thead {
  background: #0097a7;
}

body.dark tbody tr:hover {
  background: #333;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsivo */
@media (max-width: 768px) {
  .table-container {
    padding: 0.5rem;
  }
  table {
    font-size: 14px;
  }
} 
                        </style>
                    </head>
                    <body> 
                        <h1> Relatório de viagens </h1>
                            <table> 
                                <tr> 
                                    <th> ID </th>
                                    <th> Destino </th>
                                    <th> Data </th>
                                    <th> Preço </th>
                                    <th> Vagas</th>
                                     
                                </tr>
                                ${rows.map(row => `
                                    <tr> 
                                        <td>${row.id} </td>
                                        <td>${row.destino} </td>
                                        <td>${row.data_viagem} </td>
                                        <td>${row.preco} </td>
                                        <td>${row.vagas} </td>
                                    </tr>
                                    `).join('')}
                            </table>
                            <a href="/"> Voltar </a>
                    </body>
            </html>
                        
                        `) 
                    }else{
                        console.log("Erro para cadastro da viagem ", err);
                        res.send("Erro ")
        
                    }
            })
        });


        

    app.post('/cadastrar' , function(req, res){
    const destino = req.body.destino;
    const data_viagem = req.body.data_viagem;
    const preco = req.body.preco; 
    const vagas = req.body.vagas; 

    // mandar pro banco de dados
    const values = [destino, data_viagem, preco, vagas];
    const insert = "insert into viagens (destino, data_viagem, preco, vagas) values (?, ?, ?, ?)";

    connection.query(insert, values, function(err, result){
        if(!err){
            console.log("Dados inseridos com sucesso")
            res.redirect('/listar');
    
        }else{
            console.log("Não foi possivel inserir os dados", err);
            res.send("Erro!")
        }
    })
    });

// Inicia o servidor
app.listen(8083, function(){
    console.log(`🚀 Servidor rodando em http://localhost:8083`);
});
