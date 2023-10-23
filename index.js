const express = require('express');
const mysql = require('mysql');

const app = express();

//é necessário configurar o middleware express.json() para analisar o corpo da solicitação JSON. 
app.use(express.json()); //


const port = 3000; // Defina a porta que deseja executar o seu projeto. 

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor MySQL
  user: 'root', // Seu nome de usuário MySQL
  password: 'password', // Sua senha do MySQL
  database: 'oscar_database' // Nome do banco de dados
});

// Tenta conectar o MySQL. 
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err);
    return;
  }
  console.log('Conexão ao MySQL estabelecida'); // Sucesso
});

// Definir os endpoints da API

// Rota para obter todos os registros
app.get('/oscar', (req, res) => {
  const query = 'SELECT * FROM oscar';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter um registro por ID
app.get('/oscar/id/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM oscar WHERE id_registro = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar registro: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Filme não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Rota para obter um registro por ano da filmagem
app.get('/oscar/ano_filmagem/:ano', (req, res) => {
  const { ano } = req.params;
  const query = 'SELECT * FROM oscar WHERE ano_filmagem = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar registro: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Filme não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Rota para obter um resgistro por nome do indicado
app.get('/oscar/nome/:name', (req, res) => {
    const { name } = req.params;
    const query = `SELECT * FROM oscar WHERE nome_do_indicado LIKE "%${name}%" `;
    db.query(query, [name], (err, results) => {
      if (err) {
        console.error('Erro ao buscar registro: ' + err);
        res.status(500).json({ error: 'Erro ao buscar registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro não encontrado' });
      } else {
        res.json(results);
      }
    });
  });

// Finalmente, iniciamos o servidor e aplicação estará disponível. 
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}. Acesso através de http://localhost:${port}/`);
});
