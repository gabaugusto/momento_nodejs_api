const express = require('express');
const mysql = require('mysql');

const app = express();

//é necessário configurar o middleware express.json() para analisar o corpo da solicitação JSON. 
app.use(express.json());

const port = 3000; // Defina a porta que deseja executar o seu projeto. 

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor MySQL
  port: 3307,
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

//
app.get('/', (req, res) => {
  msg = `no endpoint suggested.`
  console.error('no endpoint suggested.');
  res.json(msg);
});


/////////////////////////////////////////////
/* 
Funcionarios
///////////////////////////////////////////*/

// Definir os endpoints da API
// Rota para obter todos os registros
app.get('/funcionarios', (req, res) => {
  const query = `SELECT * FROM dados_funcionarios ORDER BY primeiro_nome `;
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
  const query = `SELECT * FROM dados_funcionarios ORDER BY funcionario_id DESC LIMIT ${start},${limit}`;
  console.log(`LIMITE ${limit}(${typeof(limit)}) - Page: ${page}(${typeof(page)}) - Start + ${start}(${typeof(start)})`)
  db.query(query, [start, limit], (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionários: ' + err);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
      return;
    }
    
    res.json(results);
  });
});

// Rota para obter um funcionario por ID
app.get('/funcionarios/id/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE funcionario_id = ?`;
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
  const query = `SELECT * FROM dados_funcionarios WHERE primeiro_nome LIKE "%${name}%" OR sobrenome LIKE "%${name}%"`;
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
  const query = `SELECT * FROM dados_funcionarios WHERE email LIKE "%${email}%"`;
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
  const query = `SELECT * FROM dados_funcionarios WHERE telefone LIKE "%${phone}%"`;
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
  const query = `SELECT * FROM dados_funcionarios WHERE departamento LIKE "%${nome}%"`;
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
app.get('/funcionarios/cargo/:cargo', (req, res) => {
  const { cargo } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE cargo LIKE "%${cargo}%"`;
  db.query(query, [cargo], (err, results) => {
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

// Rota para obter um registro pelo nome do escritorio
app.get('/funcionarios/escritorio/nome/:nome', (req, res) => {
  const { nome } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE escritorio LIKE "%${nome}%"`;
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

// Rota para obter um registro pelo nome do endereco
app.get('/funcionarios/escritorio/endereco/:endereco', (req, res) => {
  const { endereco } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE endereco LIKE "%${endereco}%"`;
  db.query(query, [endereco], (err, results) => {
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

// Rota para obter um registro pelo nome do pais
app.get('/funcionarios/pais/:nome', (req, res) => {
  const { nome } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE pais LIKE "%${nome}%"`;
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

// Rota para obter um registro pelo nome do pais
app.get('/funcionarios/regiao/:nome', (req, res) => {
  const { nome } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE regiao LIKE "%${nome}%"`;
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

// Rota para obter um registro pelo salario menor que
app.get('/funcionarios/salario_lt/:valor', (req, res) => {
  const { valor } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE salario < ${valor} ORDER BY salario`;
  db.query(query, [valor], (err, results) => {
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

// Rota para obter um registro pelo salario maior que
app.get('/funcionarios/salario_gt/:valor', (req, res) => {
  const { valor } = req.params;
  const query = `SELECT * FROM dados_funcionarios WHERE salario > ${valor} ORDER BY salario`;
  db.query(query, [valor], (err, results) => {
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

/////////////////////////////////////////////
/* 
Dependentes
///////////////////////////////////////////*/
// Definir os endpoints da API
// Rota para obter todos os registros
app.get('/dependentes', (req, res) => {
  const query = `SELECT * FROM dados_dependentes ORDER BY primeiro_nome `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err);
      res.status(500).json({ error: 'Erro ao buscar registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter um registro por nome
app.get('/dependentes/nome/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM dados_dependentes WHERE primeiro_nome LIKE "%${name}%" OR sobrenome LIKE "%${name}%"`;
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


// Configurar o Express para servir arquivos estáticos
app.use(express.static('public'));

// Finalmente, iniciamos o servidor e aplicação estará disponível. 
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}. 
   Acesso através do endereço de http://localhost:${port}/`
  );
});