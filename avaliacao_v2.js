document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-button');

  submitButton.onclick = function() {
    const cpfInput = document.getElementById('cpf-input');
    const rating = getRating(); // Função que coleta a nota
    const feedback = getFeedback(); // Função que coleta os feedbacks
    const comment = document.querySelector('.comment-box').value;

    // Verificação para garantir que todos os campos estão preenchidos corretamente
    if (cpfInput.value.length !== 11 || !rating || !feedback) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Coletando o IP do usuário
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;

        // Enviar os dados via POST para a API
        fetch('https://nps-test-new-avaliation-q46q.vercel.app/api/avaliacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cpf: cpfInput.value,
            rating: rating,
            feedback: feedback,
            comentario: comment,
            ip: ip
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            alert('Avaliação enviada com sucesso!');
            window.location.href = 'https://www.drogariaspacheco.com.br';
          } else {
            alert('Erro ao enviar avaliação. Tente novamente.');
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
          alert('Erro na requisição. Por favor, tente novamente.');
        });
      })
      .catch(error => {
        console.error('Erro ao coletar IP:', error);
        alert('Erro ao coletar o IP. Por favor, tente novamente.');
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
