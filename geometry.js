// geometry.js
const express = require('express');
const app = express();
const PORT = 3000; // Escolha a porta que desejar

// Rota básica de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

function calcArea(formula) {
  console.log(formula);
  const resultado = {
    calc: formula
  };

  return resultado;
}

// 
app.get('/api/retangulo', (req, res) => {
  let { base, altura } = req.query;
  base = parseFloat(base);
  altura = parseFloat(altura);

  const formula = base * altura;
  res.json(calcArea(formula));

});

// 
app.get('/api/triangulo', (req, res) => {
  let { base, altura } = req.query;
  base = parseFloat(base);
  altura = parseFloat(altura);

  const formula = (base * altura) / 2;
  res.json(calcArea(formula));
});


// 
app.get('/api/circulo', (req, res) => {
  let {raio} = req.query;
  raio = parseFloat(raio);

  const formula = Math.PI * Math.pow(raio, 2);
  
  res.json(calcArea(formula));
});

// 
app.get('/api/quadrado', (req, res) => {
  let {lado} = req.query;
  lado = parseFloat(lado);

  const formula = Math.pow(lado, 2);
  res.json(calcArea(formula));
});

// 
app.get('/api/trapezio', (req, res) => {
  let { baseMaior, baseMenor, altura } = req.query;
  baseMaior = parseFloat(baseMaior);
  baseMenor = parseFloat(baseMenor);
  altura = parseFloat(altura);

  const formula = ((baseMaior + baseMenor) * altura) / 2;
  res.json(calcArea(formula));
});

// 
app.get('/api/poligono-regular', (req, res) => {
  let { perimetro, apotema } = req.query;
  perimetro = parseFloat(perimetro);
  apotema = parseFloat(apotema);

  const formula = (perimetro * apotema) / 2;
  res.json(calcArea(formula));
});

// 
app.get('/api/cilindro', (req, res) => {
  let { raio, altura } = req.query;
  raio = parseFloat(raio);
  altura = parseFloat(altura);

  const areaBase = Math.PI * Math.pow(raio, 2);
  const areaLateral = 2 * Math.PI * raio * altura;

  const formula = 2 * areaBase + areaLateral;
  res.json(calcArea(formula));
});

// 
app.get('/api/cone', (req, res) => {
  let { raio, geratriz } = req.query;
  raio = parseFloat(raio);
  geratriz = parseFloat(geratriz);

  const areaBase = Math.PI * Math.pow(raio, 2);
  const areaLateral = Math.PI * raio * geratriz;

  const formula = areaBase + areaLateral;
  res.json(calcArea(formula));
});

//
app.get('/api/esfera', (req, res) => {
  let {tipo, raio} = req.query;
  tipo = parseFloat(tipo);
  raio = parseFloat(raio);

  var formula;
  if (tipo == 1) {
    formula =  4 * Math.PI * Math.pow(raio, 2); // Area
  } else if (tipo == 2) {
    formula = (4 / 3) * Math.PI * Math.pow(raio, 3);  // Volume
  } else {
    formula = null;
  }
  
  res.json(calcArea(formula));
});


app.get('/api/prisma-base-retangular', (req, res) => {
  let {baseMaior, baseMenor, altura} = req.query;

  const areaBase = baseMaior * baseMenor;
  const areaLateral = 2 * (baseMaior + baseMenor) * altura;
  const formula = 2 * areaBase + areaLateral;

  res.json(calcArea(formula));
});

app.get('/api/prisma-base-quadrada', (req, res) => {
  let {ladoBase, altura} = req.query;

  const areaBase = Math.pow(ladoBase, 2);
  const areaLateral = 4 * ladoBase * altura;
  const formula = 2 * areaBase + areaLateral;

  res.json(calcArea(formula));
});

app.get('/api/prisma-base-hexagonal', (req, res) => {
  let {lado, altura} = req.query;
  const areaBase = 3 * (Math.sqrt(3) * Math.pow(lado, 2)) / 2; // Área de um hexágono regular
  const areaLateral = 6 * lado * altura;
  const formula = 2 * areaBase + areaLateral;

  res.json(calcArea(formula));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
