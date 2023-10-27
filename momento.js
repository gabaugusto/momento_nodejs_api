const express = require('express');
const mysql = require('mysql');

const app = express();

//é necessário configurar o middleware express.json() para analisar o corpo da solicitação JSON. 
app.use(express.json());

const port = 3008; // Defina a porta que deseja executar o seu projeto. 

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor MySQL
  port:3308,
  user: 'root', // Seu nome de usuário MySQL
  password: 'senac', // Sua senha do MySQL
  database: 'momento' // Nome do banco de dados
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
app.get('/funcionarios', (req, res) => {
  const query = `SELECT * FROM funcionarios`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter funcionarios com paginação
app.get('/funcionarios-pag', (req, res) => {
  let { page, limit } = req.query;
  
  page = parseInt(page);
  limit = parseInt(limit);

  let start = (page - 1) * limit; // Cálculo do índice de início
  // Cálculo do índice de término. 
  
  // Execute a consulta SQL com a cláusula LIMIT
  const query = `SELECT * FROM dados_dos_funcionarios ORDER BY funcionario_id DESC LIMIT ${start},${limit}`;
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

// Rota para obter um funcionario por ID
app.get('/funcionarios/id/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE funcionario_id = ?`;
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

// Rota para obter um registro por nome
app.get('/funcionarios/nome/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE primeiro_nome LIKE "%${name}%" OR sobrenome LIKE "%${name}%"`;
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

// Rota para obter um registro por email
app.get('/funcionarios/email/:email', (req, res) => {
  const { email } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE email LIKE "%${email}%"`;
  db.query(query, [email], (err, results) => {
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


// Rota para obter um registro por telefone
app.get('/funcionarios/telefone/:phone', (req, res) => {
  const { phone } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE telefone LIKE "%${phone}%"`;
  db.query(query, [phone], (err, results) => {
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


// Rota para obter um registro pelo nome do departamento
app.get('/funcionarios/departamento/:nome', (req, res) => {
  const { nome } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE departamento_nome LIKE "%${nome}%"`;
  db.query(query, [nome], (err, results) => {
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

// Rota para obter um registro pelo nome do cargo
app.get('/funcionarios/cargo/:nome', (req, res) => {
  const { nome } = req.params;
  const query = `SELECT * FROM dados_dos_funcionarios WHERE cargo LIKE "%${nome}%"`;
  db.query(query, [nome], (err, results) => {
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
   Acesso através do endereço de http://localhost:${port}/`
  );
});