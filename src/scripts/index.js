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

        document.querySelector('#TableToExport tbody').insertAdjacentHTML('afterbegin', /* html */ `
            <tr data-id="${rowTeste.id}" data-method="${row ? 'update' : 'create'}">
                <td><input type="text" value="${rowTeste.nome}" required></td>
                <td>
                    <select value="${rowTeste.tamanho}" required>
                        <option value='P'>Tamanho P</option>
                        <option value='M'>Tamanho M</option>
                        <option value='G'>Tamanho G</option>
                        <option value='GG'>Tamanho GG</option>
                    </select>
                </td>
                <td><input type="number" min='1' value="${rowTeste.quantidade}" required></td>
                <td><input type="text" value="${rowTeste.nomeEscrito}" required></td>
                <td><input type="number" min='0' value="${rowTeste.numeroEscrito}" required></td>
                <td class="botoes">
                    <button type="button">
                        <img class="remove" src="./public/imgs/icons8-remove-48.svg" alt="remover linha">
                    </button>
                    <button class="salvar" type="button">✅</button>
                </td>
            </tr>
        `);
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
            alert('O nome deverá ser preenchido');
        }
        else if (quantidade <= 0 || quantidade > 99) {
            error = false;
            alert('A quantidade deverá ser entre 0 e 99');
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
        
        list.forEach((row) => { createRow(row) });
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
            // /* Create worksheet from HTML DOM TABLE */
            // var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            // /* Export to file (start a download) */
            // XLSX.writeFile(wb, "SheetJSTable.xlsx");
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
        })
        
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