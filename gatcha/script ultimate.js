let totalGanhos = [];
const maxGanhos = 150;

async function callJson() {
    try {
        const response = await fetch('itensUltimate.json');  // Caminho relativo para o arquivo JSON
        const data = await response.json();  // Converte a resposta em JSON
        console.log(data);  // Manipula o JSON

        // Exemplo: Exibir o JSON no HTML
        document.getElementById('output').innerHTML = JSON.stringify(data, null, 2);
        
        return data;  // Retorna os dados do JSON
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

async function gachaSingle() {
    const data = await callJson();

    let totalChance = prizes.reduce((acc, curr) => acc + curr.chance, 0);
    let randomNum = Math.random() * totalChance;
    let prizeIndex = -1;

    for (let i = 0; i < prizes.length; i++) {
        if (randomNum <= prizes[i].chance) {
            prizeIndex = i;
            break;
        } else {
            randomNum -= prizes[i].chance;
        }
    }

    if (prizeIndex !== -1) {
        const prizeName = prizes[prizeIndex].name;
        if (totalGanhos.length < maxGanhos) {
            totalGanhos.push(prizeName);
        }
        updateContador();
        updateGanhosList(); // Adiciona a chamada para atualizar a lista de prêmios ganhos
        return prizeName;
    } else {
        // Se por algum motivo nenhum prêmio for selecionado, retorna o primeiro prêmio da lista
        return prizes[0].name;
    }
}

function gachaMulti() {
    let results = [];
    for (let i = 0; i < 10; i++) {
        const prize = gachaSingle();
        results.push(prize);
    }
    return results;
}

const btnSingle = document.getElementById('btnSingle');
const btnMulti = document.getElementById('btnMulti');
const result = document.getElementById('result');
const ganhosList = document.getElementById('ganhosList');
const contador = document.getElementById('contador');

btnSingle.addEventListener('click', () => {
    const prize = gachaSingle();
    result.innerHTML = `<p>Você ganhou: ${prize}</p>`;
});

btnMulti.addEventListener('click', () => {
    const prizes = gachaMulti();
    let prizesHTML = '<p>Você ganhou:</p><ul>';
    prizes.forEach(prize => {
        prizesHTML += `<li>${prize}</li>`;
    });
    prizesHTML += '</ul>';
    result.innerHTML = prizesHTML;
});

function updateGanhosList() {
    let ganhosHTML = '<ul>';
    totalGanhos.forEach(ganho => {
        ganhosHTML += `<li>${ganho}</li>`;
    });
    ganhosHTML += '</ul>';
    ganhosList.innerHTML = ganhosHTML;
}

function updateContador() {
    contador.textContent = `Você ganhou ${totalGanhos.length}/${maxGanhos}`;
}

// Adicionando chamadas iniciais para atualizar a lista d



