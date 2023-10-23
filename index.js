const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Defina a porta que desejar

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor MySQL
  user: 'root', // Seu nome de usuário MySQL
  password: '', // Sua senha do MySQL
  database: 'oscar_database' // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err);
    return;
  }
  console.log('Conexão ao MySQL estabelecida');
});

// Defina os endpoints da API

// Rota para obter todos os filmes
app.get('/filmes', (req, res) => {
  const query = 'SELECT * FROM filmes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar filmes: ' + err);
      res.status(500).json({ error: 'Erro ao buscar filmes' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter um filme por ID
app.get('/filmes/id/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM filmes WHERE id_registro = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar filme: ' + err);
      res.status(500).json({ error: 'Erro ao buscar filme' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Filme não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Rota para obter um filme por ID
app.get('/filmes/nome/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM filmes WHERE id_registro = ?';
    db.query(query, [name], (err, results) => {
      if (err) {
        console.error('Erro ao buscar filme: ' + err);
        res.status(500).json({ error: 'Erro ao buscar filme' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Filme não encontrado' });
      } else {
        res.json(results[0]);
      }
    });
  });

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
