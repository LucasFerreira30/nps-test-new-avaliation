const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
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

// Rota para enviar a avaliação e salvar no arquivo JSON
app.post('/api/avaliacao', (req, res) => {
  const { cpf, rating, feedback, ip } = req.body;
  console.log('Nova Avaliação Recebida:');
  console.log(`CPF: ${cpf}`);
  console.log(`Nota: ${rating}`);
  console.log('Feedback:', feedback);
  console.log(`IP: ${ip}`);

  // Estrutura da avaliação a ser armazenada
  const novaAvaliacao = {
    cpf,
    rating,
    feedback,
    ip,
    data: new Date().toISOString() // Adiciona a data da avaliação
  };

  // Lê o arquivo de avaliações (se existir) ou cria um novo
  fs.readFile('avaliacoes.json', 'utf8', (err, data) => {
    let avaliacoes = [];
    if (!err && data) {
      avaliacoes = JSON.parse(data); // Se já houver avaliações, lê do arquivo
    }

    // Adiciona a nova avaliação ao array de avaliações
    avaliacoes.push(novaAvaliacao);

    // Grava as avaliações atualizadas no arquivo JSON
    fs.writeFile('avaliacoes.json', JSON.stringify(avaliacoes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao salvar a avaliação' });
      }
      res.status(200).json({ success: true, message: 'Avaliação recebida com sucesso!' });
    });
  });
});

// Rota para consultar as avaliações
app.get('/api/relatorio', (req, res) => {
  fs.readFile('avaliacoes.json', 'utf8', (err, data) => {
    if (err || !data) {
      return res.status(500).json({ success: false, message: 'Erro ao carregar os dados' });
    }

    const avaliacoes = JSON.parse(data);
    res.json(avaliacoes); // Retorna todas as avaliações em formato JSON
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;  // Exporta o app para Vercel
