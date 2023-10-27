const express = require('express');
const mysql = require('mysql');

const app = express();

//é necessário configurar o middleware express.json() para analisar o corpo da solicitação JSON. 
app.use(express.json());

const port = process.env.PORT || 3000; // Defina a porta que deseja executar o seu projeto. 

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

const tableDB = 'oscar';

// Definir os endpoints da API
// Rota para obter todos os registros
app.get('/oscar', (req, res) => {
  const query = `SELECT * FROM ${tableDB}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter filmes com paginação
app.get('/filmes', (req, res) => {
  let { page, limit } = req.query;
  
  page = parseInt(page);
  limit = parseInt(limit);

  let start = (page - 1) * limit; // Cálculo do índice de início
  // Cálculo do índice de término. 
  
  // Execute a consulta SQL com a cláusula LIMIT
  const query = `SELECT * FROM ${tableDB} ORDER BY id_registro DESC LIMIT ${start},${limit}`;
  console.log(`LIMITE ${limit}(${typeof(limit)}) - Page: ${page}(${typeof(page)}) - Start + ${start}(${typeof(start)})`)
  db.query(query, [start, limit], (err, results) => {
    if (err) {
      console.error('Erro ao buscar filmes: ' + err);
      res.status(500).json({ error: 'Erro ao buscar filmes' });
      return;
    }
    
    res.json(results);
  });
});

// Rota para obter um registro por ID
app.get('/oscar/id/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE id_registro = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar registro: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Rota para obter um resgistro por nome do indicado
app.get('/oscar/nome/:name', (req, res) => {
  const { name } = req.params;

  const query = `SELECT * FROM ${tableDB} WHERE nome_do_indicado LIKE "%${name}%" `;
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


// Rota para obter um registro por ano da filmagem
app.get('/oscar/ano_filmagem/:ano', (req, res) => {
  const { ano } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE ano_filmagem = ?`;
  db.query(query, [ano], (err, results) => {
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

// Rota para obter um registro por edicao da cerimonia 
app.get('/oscar/cerimonia/:edicao', (req, res) => {
  const { edicao } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE edicao_cerimonia = ?`;
  db.query(query, [edicao], (err, results) => {
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

// Rota para obter um registro por edicao da cerimonia 
app.get('/oscar/filme/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE nome_filme LIKE "%${name}%"`;
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


// Rota para obter um registro por categoria 
app.get('/oscar/categoria/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE categoria LIKE "%${name}%"`;
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

// Rota para obter um registro por vencedor  
app.get('/oscar/vencedor/:vencedor', (req, res) => {
  const { vencedor } = req.params;
  const query = `SELECT * FROM ${tableDB} WHERE vencedor LIKE "%${vencedor}%"`;
  db.query(query, [vencedor], (err, results) => {
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

// Rota para enviar dados para a API
app.post('/enviar-dados', (req, res) => {
  const { nome_do_indicado, nome_filme } = req.body;

  // Faça o que você deseja com os dados, por exemplo, salvar no banco de dados

  // Você pode retornar os dados para a página HTML se desejar
  res.json({ nome_do_indicado, nome_filme });
});

// Configurar o Express para servir arquivos estáticos
app.use(express.static('public'));

// Finalmente, iniciamos o servidor e aplicação estará disponível. 
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}. 
  Acesso a API através de http://localhost:${port}/${tableDB}
  Acesso a interface através do endereço de http://localhost:${port}/`
  );
});