class Pelucia {
    constructor(n, m, v, c, t, e, tam) {
        this.nome = n;
        this.marca = m;
        this.versao = v;
        this.caixa = c;
        this.tecido = t;
        this.especie = e;
        this.tamanho = tam;
    }

    preco() {
        let value = 70;

        if (this.versao === "Edição Especial") {
            value += 100 }

        if (this.caixa === "Inclusa") {
            value += 70;
        }

        if (this.tecido === "Seda") {
            value += 50;
        }

        if (this.tecido === "Veludo") {
            value += 45;
        }

        if (this.tecido === "Algodão") {
            value += 25;
        }

        if (this.tecido === "Poliéster") {
            value += 10;
        }

        if (this.tamanho === "P") {
            value += 20;
        }

        if (this.tamanho === "M") {
            value += 45;
        }

        if (this.tamanho === "G") {
            value += 60;
        }

        if (this.tamanho === "XG") {
            value += 160;
        }

        return value;
    }
}

var vetor = [];

document.body.onload = function() {
    vetor = JSON.parse(localStorage.getItem("vetAut"));
    if (vetor == null) {
        vetor = [];
    } else {
        // Converte os objetos simples de volta para instâncias da classe Pelucia
        vetor = vetor.map(item => new Pelucia(item.nome, item.marca, item.versao, item.caixa, item.tecido, item.especie, item.tamanho));
    }
    atualizarPreco();
}

const precoDisplay = document.getElementById('precoDisplay');

// Função para atualizar o preço
function atualizarPreco() {
    const aut = new Pelucia(c1.value, c2.value, c3.value, c4.value, c5.value, c6.value, c7.value);
    const valor = aut.preco();
    precoDisplay.value = `R$ ${valor.toFixed(2)}`;
}

// Adicionando eventos de mudança nos campos de entrada
c1.addEventListener('change', atualizarPreco);
c2.addEventListener('change', atualizarPreco);
c3.addEventListener('change', atualizarPreco);
c4.addEventListener('change', atualizarPreco);
c5.addEventListener('change', atualizarPreco);
c6.addEventListener('change', atualizarPreco);
c7.addEventListener('change', atualizarPreco);

f1.onsubmit = function(e) {
    e.preventDefault();  // cancela submit do formulário
    // Criar objeto pelúcia
    var aut = new Pelucia(c1.value, c2.value,
        c3.value, c4.value,
        c5.value, c6.value,
        c7.value);
    vetor.push(aut);
    localStorage.setItem("vetAut", JSON.stringify(vetor));
}

bListar.onclick = function() {
    // Limpar a div
    while (dListar.hasChildNodes()) {
        dListar.removeChild(dListar.childNodes[0]);
    }

    // Inserir dados de pelúcias na DIV com botão de exclusão
    vetor.forEach((a, index) => {
        const valor = a.preco(); // Chama o método para obter o preço
        const descr = `Nome da pelúcia: ${a.nome}
Marca: ${a.marca}
Versão: ${a.versao}
Caixa de voz: ${a.caixa}
Tecido: ${a.tecido}
Espécie: ${a.especie}
Tamanho: ${a.tamanho}
Preço Final: R$ ${valor.toFixed(2)}
`; // Adiciona o preço à descrição
        const novoParagrafo = document.createElement('pre');
        novoParagrafo.textContent = descr;

        // Botão para excluir individualmente
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('botao-excluir', 'input');
        botaoExcluir.onclick = function() {
            // Remove a pelúcia do vetor
            vetor.splice(index, 1);
            // Atualiza o localStorage
            localStorage.setItem("vetAut", JSON.stringify(vetor));
            // Recarregar a lista
            bListar.onclick();
        };

        // Adicionar descrição e botão de exclusão na div
        novoParagrafo.appendChild(botaoExcluir);
        dListar.appendChild(novoParagrafo);
    });

    // Verificar se a div tem conteúdo após adicionar os itens
    if (dListar.hasChildNodes()) {
        // Mudar cor de fundo se houver conteúdo
        dListar.style.backgroundColor = 'var(--cor-principal)';
    } else {
        // Se não houver conteúdo, remove a cor de fundo
        dListar.style.backgroundColor = '';
    }
};

bLimpar.onclick = function() {
    localStorage.clear();
    vetor = []; // Limpa o vetor também

    // Limpar a div
    while (dListar.hasChildNodes()) {
        dListar.removeChild(dListar.childNodes[0]);
    }

    // Resetar a cor de fundo da div quando limpar
    dListar.style.backgroundColor = ''; // Volta ao fundo original sem cor
};

// =)!