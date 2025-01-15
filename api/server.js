const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Porta para o Vercel ou ambiente local
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
  origin: 'https://lucasferreira30.github.io', // Permite apenas requisições de seu domínio GitHub Pages
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/api/avaliacao', (req, res) => {
  const { cpf, rating, feedback, ip } = req.body;
  console.log('Nova Avaliação Recebida:');
  console.log(`CPF: ${cpf}`);
  console.log(`Nota: ${rating}`);
  console.log('Feedback:', feedback);
  console.log(`IP: ${ip}`);

  // Aqui você pode salvar os dados em um banco de dados ou arquivo

  res.status(200).json({ success: true, message: 'Avaliação recebida com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;  // Exporta o app para Vercel
