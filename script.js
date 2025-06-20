document.addEventListener('DOMContentLoaded', () => {
    // Ordem das cartas do truco (da mais fraca para a mais forte)
    const ordemValores = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
    const naipe = 'ouro'; // Exibir apenas OURO

    const container = document.getElementById('cartas-container');
    const manilhaDestacada = document.getElementById('manilha-destacada');
    const textoManilha = document.getElementById('texto-manilha');

    let vira = null;

    function proximoValor(valor) {
        const idx = ordemValores.indexOf(valor);
        return ordemValores[(idx + 1) % ordemValores.length];
    }

    function ordenarCartas(viraValor) {
        if (!viraValor) return ordemValores.map(valor => ({ valor, naipe }));

        const manilhaValor = proximoValor(viraValor);

        // Remove manilha da ordem normal
        const ordemSemManilha = ordemValores.filter(v => v !== manilhaValor);

        // Se vira for 3, ordem começa do 5 até 3, manilha é 4
        if (viraValor === '3') {
            const idx5 = ordemSemManilha.indexOf('5');
            const antes = ordemSemManilha.slice(idx5);
            const depois = ordemSemManilha.slice(0, idx5);
            // Corrigido: retorna todos os valores, inclusive a manilha, como objetos no array
            return [
                ...antes.map(valor => ({ valor, naipe })),
                ...depois.map(valor => ({ valor, naipe })),
                { valor: manilhaValor, naipe }
            ];
        }

        // Ordem normal, manilha no final
        return [
            ...ordemSemManilha.map(valor => ({ valor, naipe })),
            { valor: manilhaValor, naipe }
        ];
    }

    function renderCartas(ordem) {
        container.innerHTML = '';
        ordem.forEach(({ valor }) => {
            const cartaDiv = document.createElement('div');
            cartaDiv.className = `carta`;

            const img = document.createElement('img');
            img.src = `assets/${valor}.png`;
            img.alt = `${valor}`;
            img.className = 'imagem-carta';

            cartaDiv.appendChild(img);

            cartaDiv.onclick = () => selecionarVira(valor);

            container.appendChild(cartaDiv);
        });
    }

    function selecionarVira(valor) {
        vira = valor;
        renderManilha();
        renderCartas(ordenarCartas(valor));
    }

    function renderManilha() {
        manilhaDestacada.innerHTML = '';
        if (!vira) return;

        // textoManilha.textContent = `Vira: ${vira}`;

        // Imagem do monte de baralho virado de costas (mesmo tamanho da carta em destaque)
        const monteDiv = document.createElement('div');
        monteDiv.className = 'carta manilha-carta';
        const imgMonte = document.createElement('img');
        imgMonte.src = 'assets/baralho-costa.png';
        imgMonte.alt = 'Monte de baralho';
        imgMonte.className = 'imagem-carta';
        monteDiv.appendChild(imgMonte);

        // Carta da vira
        const cartaViraDiv = document.createElement('div');
        cartaViraDiv.className = `carta manilha-carta`;
        const imgVira = document.createElement('img');
        imgVira.src = `assets/${vira}.png`;
        imgVira.alt = `${vira}`;
        imgVira.className = 'imagem-carta';
        cartaViraDiv.appendChild(imgVira);

        // Descobre o valor das manilhas
        const ordemValores = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
        const ordemNaipes = ['ouro', 'espada', 'copa', 'basto'];
        const manilhaNomes = {
            ouro: 'PICA-FUMO',
            espada: 'ESPADILHA',
            copa: 'COPA',
            basto: 'PAUS'
        };
        function proximoValor(valor) {
            const idx = ordemValores.indexOf(valor);
            return ordemValores[(idx + 1) % ordemValores.length];
        }
        const manilhaValor = proximoValor(vira);

        // Container para as manilhas (cada bloco: carta + nome)
        const manilhasContainer = document.createElement('div');
        manilhasContainer.style.display = 'flex';
        manilhasContainer.style.gap = '16px';
        manilhasContainer.style.alignItems = 'flex-end';
        manilhasContainer.style.marginLeft = '24px';

        ordemNaipes.forEach(naipe => {
            const bloco = document.createElement('div');
            bloco.style.display = 'flex';
            bloco.style.flexDirection = 'column';
            bloco.style.alignItems = 'center';

            const cartaDiv = document.createElement('div');
            cartaDiv.className = `carta`;
            const img = document.createElement('img');
            img.src = `assets/${naipe}${manilhaValor}.png`;
            img.alt = `${manilhaValor} de ${naipe}`;
            img.className = 'imagem-carta';
            cartaDiv.appendChild(img);

            const nomeDiv = document.createElement('div');
            nomeDiv.style.textAlign = 'center'; 
            nomeDiv.style.fontWeight = 'bold';
            nomeDiv.style.fontSize = '0.60rem';
            nomeDiv.style.marginTop = '3px';
            nomeDiv.textContent = manilhaNomes[naipe];

            bloco.appendChild(cartaDiv);
            bloco.appendChild(nomeDiv);
            manilhasContainer.appendChild(bloco);
        });

        // Wrapper para alinhar monte, vira e manilhas lado a lado
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.appendChild(monteDiv);
        wrapper.appendChild(cartaViraDiv);
        wrapper.appendChild(manilhasContainer);

        manilhaDestacada.appendChild(wrapper);
    }

    // Inicialização
    renderCartas(ordenarCartas(null));
    renderManilha();
});

window.alterarPontos = function(dupla, valor) {
    const id = dupla === 'azul' ? 'pontos-azul' : 'pontos-vermelho';
    const pontosDiv = document.getElementById(id);
    let pontos = parseInt(pontosDiv.textContent, 10) || 0;
    pontos = Math.max(0, pontos + valor);
    pontosDiv.textContent = pontos;
};