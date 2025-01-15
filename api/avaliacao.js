// Espera o documento carregar antes de associar eventos
document.addEventListener('DOMContentLoaded', function() {
    let rating = null;
    let feedback = {
        atendimento: null,
        disponibilidade: null,
        promocao: null,
        ambiente: null,
        pagamento: null,
        preco: null,
        comentario: ""
    };

    const ratingButtonsDiv = document.getElementById('rating-buttons');
    const emojiDiv = document.getElementById('emoji');
    const emojis = ['😡', '😠', '😞', '😕', '😐', '🙂', '😊', '😀', '😃', '😄', '😁'];

    // Cria os botões de avaliação de 0 a 10
    for (let i = 0; i <= 10; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.style.backgroundColor = `rgb(${255 - i * 25}, ${i * 25}, 0)`;
        button.onclick = () => {
            rating = i;
            emojiDiv.innerText = emojis[i];
        };
        ratingButtonsDiv.appendChild(button);
    }

    // Adiciona funcionalidade aos botões de feedback
    document.querySelectorAll('.feedback-button').forEach(button => {
        button.onclick = function() {
            const feedbackType = this.dataset.feedback;
            const value = this.dataset.value;
            if (value === 'ignore') {
                feedback[feedbackType] = null;
            } else {
                feedback[feedbackType] = value;
            }

            const siblingButtons = this.parentElement.querySelectorAll('button');
            siblingButtons.forEach(sibling => {
                sibling.style.backgroundColor = '';
            });
            this.style.backgroundColor = '#4CAF50';
        };
    });

    // Coleta do comentário
    const commentBox = document.querySelector('.comment-box');
    commentBox.oninput = function() {
        feedback.comentario = this.value;
    };

    // Lógica de CPF
    const cpfOverlay = document.getElementById('cpf-overlay');
    const cpfInput = document.getElementById('cpf-input');
    const cpfButton = document.getElementById('cpf-button');

    cpfButton.onclick = function() {
        const cpf = cpfInput.value;
        if (cpf.length === 11 && !isNaN(cpf)) {
            cpfOverlay.style.display = 'none';
        } else {
            alert('CPF inválido. Por favor, insira um CPF válido com 11 dígitos.');
        }
    };

    // Envio da avaliação
    const submitButton = document.getElementById('submit-button');

    // Coleta do IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            submitButton.onclick = function() {
                // Verifica se todos os campos obrigatórios foram preenchidos
                if (rating === null || Object.values(feedback).some(value => value === null)) {
                    alert('Por favor, preencha todos os campos obrigatórios antes de enviar.');
                    return;
                }

                // Envia os dados para o servidor
                fetch('http://localhost:3000/avaliacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cpf: cpfInput.value,
                        rating: rating,
                        feedback: feedback,
                        ip: ip // Envia o IP
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Avaliação enviada com sucesso!');
                        window.location.href = "https://www.drogariaspacheco.com.br";
                    } else {
                        alert('Erro ao enviar a avaliação. Tente novamente.');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao tentar enviar a avaliação.');
                });
            };
        });
});
