const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração do CORS
const corsOptions = {
  origin: '*', // Permite todas as origens (para fins de teste; em produção, você pode restringir a um domínio específico)
  methods: ['GET', 'POST', 'OPTIONS'], // Permite os métodos que serão usados
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite os cabeçalhos que você pode precisar
};

// Use CORS com as opções configuradas
app.use(cors(corsOptions));

// Middleware para o corpo das requisições
app.use(bodyParser.json());

// Rota POST para receber a avaliação
app.post('/avaliacao', (req, res) => {
  const { cpf, rating, feedback, ip } = req.body;
  console.log('Nova Avaliação Recebida:');
  console.log(`CPF: ${cpf}`);
  console.log(`Nota: ${rating}`);
  console.log('Feedback:', feedback);
  console.log(`IP: ${ip}`);

  // Aqui você pode salvar os dados em um banco de dados ou arquivo

  res.status(200).json({ success: true, message: 'Avaliação recebida com sucesso!' });
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
