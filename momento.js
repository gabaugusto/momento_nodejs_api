const express = require('express');
const mysql = require('mysql');

const app = express();

//é necessário configurar o middleware express.json() para analisar o corpo da solicitação JSON. 
app.use(express.json());

const port = 3000; // Defina a porta que deseja executar o seu projeto. 

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor MySQL
  port: 3306,
  user: 'root', // Seu name de usuário MySQL
  password: 'root', // Sua senha do MySQL
  database: 'momento' // name do banco de dados
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
employees
///////////////////////////////////////////*/

// Definir os endpoints da API
// Rota para obter todos os registros
app.get('/employees', (req, res) => {
  const query = `SELECT * FROM data_employees ORDER BY first_name `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter employees com paginação
app.get('/employees-pag', (req, res) => {
  let { page, limit } = req.query;
  
  page = parseInt(page);
  limit = parseInt(limit);

  let start = (page - 1) * limit; // Cálculo do índice de início
  // Cálculo do índice de término. 
  
  // Execute a consulta SQL com a cláusula LIMIT
  const query = `SELECT * FROM data_employees ORDER BY employee_id DESC LIMIT ${start},${limit}`;
  //console.log(`LIMITE ${limit}(${typeof(limit)}) - Page: ${page}(${typeof(page)}) - Start + ${start}(${typeof(start)})`)
  db.query(query, [start, limit], (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionários: ' + err);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
      return;
    }
    
    res.json(results);
  });
});

app.get('/employees/id/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM data_employees WHERE employee_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/employees/name/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM data_employees WHERE first_name LIKE "%${name}%" OR last_name LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/email/:email', (req, res) => {
  const { email } = req.params;
  const query = `SELECT * FROM data_employees WHERE email LIKE "%${email}%"`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/phone/:phone', (req, res) => {
  const { phone } = req.params;
  const query = `SELECT * FROM data_employees WHERE phone LIKE "%${phone}%"`;
  db.query(query, [phone], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/departament/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM data_employees WHERE departament LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/position/:position', (req, res) => {
  const { position } = req.params;
  const query = `SELECT * FROM data_employees WHERE position LIKE "%${position}%"`;
  db.query(query, [position], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/office/name/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM data_employees WHERE office LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/office/adress/:adress', (req, res) => {
  const { adress } = req.params;
  const query = `SELECT * FROM data_employees WHERE adress LIKE "%${adress}%"`;
  db.query(query, [adress], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/country/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM data_employees WHERE country LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/region/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM data_employees WHERE region LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/salary_lt/:value', (req, res) => {
  const { value } = req.params;
  const query = `SELECT * FROM data_employees WHERE salary < ${value} ORDER BY salary`;
  db.query(query, [value], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

app.get('/employees/salary_gt/:value', (req, res) => {
  const { value } = req.params;
  const query = `SELECT * FROM data_employees WHERE salary > ${value} ORDER BY salary`;
  db.query(query, [value], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

/////////////////////////////////////////////
/* 
relatives
///////////////////////////////////////////*/
app.get('/relatives', (req, res) => {
  const query = `SELECT * FROM data_relatives ORDER BY first_name `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});


app.get('/relatives/name/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM dados_relatives WHERE first_name LIKE "%${name}%" OR last_name LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching record: ' + err);
      res.status(500).json({ error: 'Error fetching record' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(results);
    }
  });
});

// Rota para obter todos os registros
app.get('/supplies', (req, res) => {
  const query = `SELECT * FROM cost_offices `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter todos os registros
app.get('/supplies/cost', (req, res) => {
  const query = `SELECT SUM(cost) as cost, office_name FROM cost_offices GROUP BY office_name`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter todos os registros
app.get('/sales', (req, res) => {
  const query = `SELECT * FROM sales_report`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});

app.get('/sales/name/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM sales_report WHERE first_name LIKE "%${name}%" OR last_name LIKE "%${name}%"`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});


app.get('/audit', (req, res) => {
  const query = `SELECT * FROM audit_system ORDER BY timestamp`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
  });
});

app.get('/audit/name/:name', (req, res) => {
  const { name } = req.params;
  const query = `SELECT * FROM audit_system WHERE first_name LIKE "%${name}%" OR last_name LIKE "%${name}%" ORDER BY timestamp`;
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error fetching records: ' + err);
      res.status(500).json({ error: 'Error fetching records' });
      return;
    }
    res.json(results);
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