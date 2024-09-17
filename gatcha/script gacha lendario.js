let totalGanhos = [];
const maxGanhos = 100;

function gachaSingle() {
    const prizes = [
        { name: 'Dados Cruzados - Tempo', chance: 0.5 },
        { name: 'Última evolução: Amizade', chance: 0.5 },
        { name: 'Colar de unidade zero', chance: 0.5 },
        { name: 'Kit de extração', chance: 1 },
        { name: 'Caixa de Conjunto MegaReforçada', chance: 2 },
        { name: 'DigiOvo Aleatório', chance: 8 },
        { name: 'DigiOvo de Raremon', chance: 10 },
        { name: 'Pedra de Mudança de status', chance: 13 },
        { name: 'Backup de incubação', chance: 13.5 },
        { name: 'Caixa de Chip de Conversão', chance: 17 },
        { name: 'Fruta Homeóstase 25un', chance: 17 },
        { name: 'Bolo Doce de morango 200un', chance: 17 },
    ];

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



