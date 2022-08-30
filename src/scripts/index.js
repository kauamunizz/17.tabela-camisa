import '../styles/styles.scss';


"strict mode"


const index = (() => {

    const state = {
        list: []
    }

    function createRow(row) {
        const rowTeste = row || {
            id: Date.now(),
            nome: '',
            tamanho: '',
            quantidade: '',
            nomeEscrito: '',
            numeroEscrito: ''
        }

        document.querySelector('#TableToExport tbody').insertAdjacentHTML('beforeend', /* html */ `
            <tr data-id="${rowTeste.id}" data-method="${row ? 'update' : 'create'}">
                <td><input type="text" value="${rowTeste.nome}" required placeholder="Digite seu nome:"></td>
                <td>
                    <select value="${rowTeste.tamanho}" required>
                        <option value='P'>Tamanho P</option>
                        <option value='M'>Tamanho M</option>
                        <option value='G'>Tamanho G</option>
                        <option value='GG'>Tamanho GG</option>
                    </select>
                </td>
                <td><input type="number" min='1' value="${rowTeste.quantidade}" required placeholder="Selecione a quantidade:"></td>
                <td><input type="text" value="${rowTeste.nomeEscrito}" required placeholder="Ex: Neymar"></td>
                <td><input class='end' type="number" min='0' value="${rowTeste.numeroEscrito}" required placeholder="Ex: 10"></td>
                <td class="botoes">
                    <button type="button">
                        <img class="remove" src="./public/imgs/icons8-remove-48.svg" alt="remove row">
                    </button>
                    <button type="button">
                        <img class="salvar" src="./public/imgs/icon-checked.svg" alt="apply row">
                    </button>
                </td>
            </tr>
        `);
        focusRow();
    }

    function focusRow() {
        document.querySelector('#TableToExport tbody').lastElementChild
        .querySelector('.end').addEventListener('focus', () => createRow());    
    }

    function validateRow(row) {
        let error = true;
        const inputs = row.querySelectorAll('input');
        const select = row.querySelector('select');

        const nome = inputs[0].value;
        const tamanho = select.value;
        const quantidade = Number(inputs[1].value);
        const nomeEscrito = inputs[2].value;
        const numEscrito = Number(inputs[3].value);

        if (nome === '') {
            error = false;
            alert('O nome deverá ser preenchido.');
        }
        else if (tamanho === Number) {
            error = false;
            alert('A tamanho deverá ser P, M, G ou GG.');
        }
        else if (quantidade <= 0 || quantidade > 99) {
            error = false;
            alert('A quantidade de camisas deverá ser entre 1 e 99.');
        }
        else if (nomeEscrito === '') {
            error = false;
            alert('O nome escrito deverá ser preenchido.');
        }
        else if (numEscrito <= 0 || numEscrito > 99) {
            error = false;
            alert('O numero escrito deverá ser entre 0 e 99.');
        }

        return error;
    }

    function saveRow(row) {
        const inputs = row.querySelectorAll('input');
        const select = row.querySelector('select');

        const nome = inputs[0].value;
        const tamanho = select.value;
        const quantidade = inputs[1].value;
        const nomeEscrito = inputs[2].value;
        const numEscrito = inputs[3].value;
        
        const newRow = {
            id: Date.now(),
            nome: nome,
            tamanho: tamanho,
            quantidade: quantidade,
            nomeEscrito: nomeEscrito,
            numeroEscrito: numEscrito
        }

        state.list.push(newRow);

        renderRow();
    }

    function updateRow(row) {
        const { id } = row.dataset;
        const inputs = row.querySelectorAll('input');
        const select = row.querySelector('select');
        const rowUpdate = state.list.find(atual => atual.id === Number(id));

        rowUpdate.nome = inputs[0].value,
        rowUpdate.tamanho = select.value,
        rowUpdate.quantidade = inputs[1].value,
        rowUpdate.nomeEscrito = inputs[2].value,
        rowUpdate.numeroEscrito = inputs[3].value
        
        renderRow();
    }

    function renderRow() {
        const {list} = state;
        const table = document.querySelector('#TableToExport tbody');
        table.innerHTML = '';
        
        
        if (list.length) {
            list.forEach((row) => { createRow(row) });
        }
        else {
            createRow();
        }
    }

    
    function deleteRow(id) {
        state.list = state.list.filter(atual => atual.id !== Number(id));
        
        renderRow();
    }

    function events() {
        
        document.getElementById("sheetjsexport").addEventListener('click', function() {
            const newList = state.list.map(({id, ...row}) => row);
            const worksheet = XLSX.utils.json_to_sheet(newList);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Camisas");

            XLSX.writeFile(workbook, "Camisas.xlsx");
        });


        document.querySelector('.add').addEventListener('click', () => createRow());

        document.querySelector('#TableToExport').addEventListener('click', (event) => {
            const click = event.target;

            if (click.classList.contains('salvar')) {
                const row = click.closest('tr');
                const {method} = row.dataset;
                
                if (validateRow(row)) {
                    if (method === 'create') {
                        saveRow(row);
                    }
                    else {
                        updateRow(row);
                    }
                }
            }
            else if (click.classList.contains('remove')) {
                const id = click.closest('tr').dataset.id;
                deleteRow(id);
            }
        });
    }


    function init() {
        createRow();
        events();
    }
    
    return {
        init
    }

})();

document.addEventListener('DOMContentLoaded', index.init);