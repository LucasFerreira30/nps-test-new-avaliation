document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');

    submitButton.onclick = function() {
        // Verificar se os campos estão preenchidos antes de enviar os dados
        const cpfInput = document.getElementById('cpf-input');
        const rating = getRating(); // função que coleta a nota
        const feedback = getFeedback(); // função que coleta os feedbacks
        const comment = document.querySelector('.comment-box').value;

        if (cpfInput.value.length !== 11 || !rating || !feedback) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        // Coletando o IP do usuário
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;

                // Enviar os dados via POST para a API
                fetch('https://novo-nps-survey-solucx-ayzhpaluo.vercel.app/api/avaliacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cpf: cpfInput.value,
                        rating: rating,
                        feedback: feedback,
                        comentario: comment,
                        ip: ip
                    })
                })
                .then(response => response.json())  // Corrigido para tratamento de resposta como JSON
                .then(data => {
                    if (data.success) {
                        alert('Avaliação enviada com sucesso!');
                        window.location.href = 'https://www.drogariaspacheco.com.br';
                    } else {
                        alert('Erro ao enviar a avaliação.');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao tentar enviar a avaliação.');
                });
            })
            .catch(error => {
                console.error('Erro ao coletar o IP:', error);
                alert('Erro ao tentar coletar o IP.');
            });
    };
});

// Funções auxiliares para capturar a nota e feedback
function getRating() {
    const emojiDiv = document.getElementById('emoji');
    return emojiDiv.innerText; // Pega o emoji para saber a nota
}

function getFeedback() {
    let feedback = {};
    document.querySelectorAll('.feedback-button').forEach(button => {
        if (button.style.backgroundColor === 'rgb(76, 175, 80)') {
            feedback[button.dataset.feedback] = button.dataset.value;
        }
    });
    return feedback;
}
