"strict mode"


import '../styles/styles.scss';


const index = (() => {

    const state = {
        list: []
    }

    function createRow(row) {
        const r = row || {
            id: Date.now(),
            nome: '',
            tamanho: '',
            quantidade: '',
            nomeEscrito: '',
            numEscrito:''
        };

        return /*html*/`
        <tr class='secundario' data-id=${r.id}>
            <td><input type="text" value=${r.nome}></td>
            <td><input type="text" value=${r.tamanho}></td>
            <td><input type="text" value=${r.quantidade}></td>
            <td><input type="text" value=${r.nomeEscrito}></td>
            <td><input type="text" value=${r.numEscrito}></td>
            <td>
                <button type="button">
                    <img class="remove" src="./public/imgs/icons8-remove-48.svg" alt="remover linha">
                </button>
                <button class="salvar" type="button">salvar</button>
            </td>
        </tr>
        `;
    }

    function renderTable() {
        const table = document.querySelector('#TableToExport tbody');
        table.innerHTML = '';
        
        state.list.forEach(row => {
            table.insertAdjacentHTML('beforeend', createRow(row));
        });
    }

    function saveRow(row) {
        const id = Number(row.dataset.id);
        const item = state.list.find(f => f.id === id);
        const itemRow = item || {
            id: Date.now(),
            nome: '',
            tamanho: '',
            quantidade: '',
            nomeEscrito: '',
            numEscrito:''
        };
        console.log(id, item);

        const inputs = row.querySelectorAll('input');
        const nome = inputs[0].value;
        const tamanho = inputs[1].value;
        const quantidade = inputs[2].value;
        const nomeEscrito = inputs[3].value;
        const numEscrito = inputs[4].value;
        
        const rowItem = {
            id: Date.now(),
            nome: nome,
            tamanho: tamanho,
            quantidade: quantidade,
            nomeEscrito: nomeEscrito,
            numEscrito: numEscrito
        }
        state.list.push(rowItem);
        renderTable();
        console.log(state.list);
    }


    // temp1.find(f => f.id === 1661177453622)

    function events() {
        
        document.getElementById("sheetjsexport").addEventListener('click', function() {
            /* Create worksheet from HTML DOM TABLE */
            var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            /* Export to file (start a download) */
            XLSX.writeFile(wb, "SheetJSTable.xlsx");
        });
        
        document.querySelector('.add').addEventListener('click', () => {
            document.querySelector('#TableToExport > tbody')
            .insertAdjacentHTML('afterend', createRow())
        })
        
        document.querySelector('#TableToExport').addEventListener('click', (event) => {
            const element = event.target;
            
            if (element.classList.contains('remove')) {
                element.closest('tr').remove();
            } 
            else if (element.classList.contains('salvar')) {
                saveRow(element.closest('tr'));
            }
        });
    }
    
    
    function init() {
        events();
    }
    
    return {
        init
    }

})();

document.addEventListener('DOMContentLoaded', index.init);