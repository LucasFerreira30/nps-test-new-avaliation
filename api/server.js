const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
