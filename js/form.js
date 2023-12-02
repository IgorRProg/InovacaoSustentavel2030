document.addEventListener('DOMContentLoaded', function () {
    let listaDadosFormulario = [];

    const formulario = document.querySelector('.formulario');
    const listaDadosContainer = document.getElementById('lista-dados');
    const botoesContainer = document.getElementById('botoes-container');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const dadosFormulario = {
            nome: document.getElementById('nome').value,
            idade: document.getElementById('idade').value,
            pais: document.getElementById('pais').value,
            email: document.getElementById('email').value,
            opiniao: document.getElementById('opiniao').value,
            dataEnvio: new Date().toLocaleString()
        };
    
        listaDadosFormulario.push(dadosFormulario);
        localStorage.setItem('listaDadosFormulario', JSON.stringify(listaDadosFormulario));
        atualizarLista();
        alert('Formulário enviado com sucesso! Você pode enviar mais de um formulário por sessão.');
    });    

    function criarElementoBotao(index) {
        const botao = document.createElement('button');
        botao.textContent = 'Excluir';
        botao.addEventListener('click', function () {
            excluirItem(index);
        });
        return botao;
    }

    function atualizarLista() {
        listaDadosContainer.innerHTML = '';

        listaDadosFormulario.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Idade:</strong> ${item.idade}</p>
                <p><strong>País:</strong> ${item.pais}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Opinião:</strong> ${item.opiniao}</p>
                <p><strong>Data de Envio:</strong> ${item.dataEnvio}</p>
            `;
            listItem.appendChild(criarElementoBotao(index));
            listaDadosContainer.appendChild(listItem);
        });
    }

    function excluirItem(index) {
        const confirmacao = confirm('Deseja realmente excluir este item?');
        
        if (confirmacao) {
            listaDadosFormulario.splice(index, 1);
            localStorage.setItem('listaDadosFormulario', JSON.stringify(listaDadosFormulario));
            atualizarLista();
        }
    }
    
    const botaoLimpar = document.getElementById('limpar-campos');

    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', function () {
            document.querySelector('.formulario').reset();
        });
    }

    const botaoExcluirTodos = document.getElementById('excluir-todos');

    if (botaoExcluirTodos) {
        botaoExcluirTodos.addEventListener('click', function () {
            listaDadosFormulario = [];
            localStorage.setItem('listaDadosFormulario', JSON.stringify(listaDadosFormulario));
            atualizarLista();
        });
    }

    const botaoPesquisar = document.querySelector('[value="Pesquisar"]');
    const campoPesquisar = document.getElementById('pesquisar');

    if (botaoPesquisar && campoPesquisar) {
        botaoPesquisar.addEventListener('click', function () {
            const palavraChave = campoPesquisar.value.toLowerCase();

            const resultadosFiltrados = listaDadosFormulario.filter(item => {
                const textoParaBusca = `${item.nome} ${item.idade} ${item.pais} ${item.email} ${item.opiniao}`.toLowerCase();
                return textoParaBusca.includes(palavraChave);
            });

            exibirResultadoPesquisa(palavraChave, resultadosFiltrados);
        });
    }

    function exibirResultadoPesquisa(palavraChave, resultados) {
        listaDadosContainer.innerHTML = '';

        resultados.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <p><strong>Palavra-Chave Buscada:</strong> ${palavraChave}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Idade:</strong> ${item.idade}</p>
                <p><strong>País:</strong> ${item.pais}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Opinião:</strong> ${item.opiniao}</p>
                <p><strong>Data de Envio:</strong> ${item.dataEnvio}</p>
            `;
            listItem.appendChild(criarElementoBotao(index));
            listaDadosContainer.appendChild(listItem);
        });
    }
});