let totalGanhos = [];
const maxGanhos = 150;

function gachaSingle() {
    const prizes = [
        { name: 'Caixa de Tristeza e Determinação', chance: 0.05 },
        { name: '103-SnowFlower-OT [Evento] Selado', chance: 0.05 },
        { name: 'Caixa Aleatória de acessorios de Unidade Zero', chance: 0.45 },
        { name: 'Caixa Selada de Pacote de Acessorios Hazard', chance: 0.45 },
        { name: 'Cápsula de memória de habilidades de avançado [Ataque], [Defesa], [Supporte]', chance: 1 },
        { name: 'DIGI-Chaveiro', chance: 1 },
        { name: 'Kit de extração de dados evolutivos', chance: 1 },
        { name: 'Digiclone Mega Reforçado', chance: 2 },
        { name: 'DigiAura Reforçado Embalado Ver. X [30D]', chance: 2 },
        { name: 'DigiAura Reforçado Embalado Ver. Y [30D]', chance: 2 },
        { name: 'Caixa Aleatória All Chip Reforçado R17 ~ R20', chance: 10 },
        { name: 'Caixa Aleatória Classificação do Atributo  E Lv1 ~ F LvMax', chance: 10 },
        { name: 'Bilhete de seleção de ingresso para admissão de Dungeon[Evento]', chance: 10 },
        { name: 'Pedra da Mudança de Status 40un', chance: 10 },
        { name: 'Pedra da Mudança de Valor 40un', chance: 10 },
        { name: 'Banana Platinada', chance: 10 },
        { name: 'Cupom de milhagem Ultimate', chance: 30 },


        
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



