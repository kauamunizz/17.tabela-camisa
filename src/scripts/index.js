import '../styles/styles.scss';


"strict mode"


const index = (() => {

    const state = {
        list: []
    }

    function createRow(items) {
        const rowTeste = items || {
            id: Date.now(),
            nome: '',
            tamanho: '',
            quantidade: '',
            nomeEscrito: '',
            numeroEscrito: ''
        }
        const {id} = rowTeste;
        console.log('create', state.list)

        return /* html */ `
            <tr data-id=${id}>
                <td><input type="text" value=${rowTeste.nome}></td>
                <td><input type="text" value=${rowTeste.tamanho}></td>
                <td><input type="text" value=${rowTeste.quantidade}></td>
                <td><input type="text" value=${rowTeste.nomeEscrito}></td>
                <td><input type="text" value=${rowTeste.numeroEscrito}></td>
                <td class="botoes">
                    <button type="button">
                        <img class="remove" src="./public/imgs/icons8-remove-48.svg" alt="remover linha">
                    </button>
                    <button class="salvar" type="button">✅</button>
                </td>
            </tr>
        `;
    }

    function saveRow() {
        const container = document.querySelector('#TableToExport tbody');
        const inputs = container.querySelectorAll('input');

        const nome = inputs[0].value;
        const tamanho = inputs[1].value;
        const quantidade = inputs[2].value;
        const nomeEscrito = inputs[3].value;
        const numEscrito = inputs[4].value;
        
        const newRow = {
            id: Date.now(),
            nome: nome,
            tamanho: tamanho,
            quantidade: quantidade,
            nomeEscrito: nomeEscrito,
            numeroEscrito: numEscrito
        }

        state.list.push(newRow);
        console.log('saverow',state.list);

        renderRow();
    }

    function renderRow() {
        const {list} = state;
        const table = document.querySelector('#TableToExport tbody');
        table.innerHTML = '';
        
        list.forEach((items) => {
            table.insertAdjacentHTML('afterbegin', createRow(items));
        });
    }

    
    function deleteRow(id) {
        state.list = state.list.filter(atual => atual.id !== Number(id));
        
        renderRow();
    }

    function events() {
        
        document.getElementById("sheetjsexport").addEventListener('click', function() {
            /* Create worksheet from HTML DOM TABLE */
            var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            /* Export to file (start a download) */
            XLSX.writeFile(wb, "SheetJSTable.xlsx");
        });
        
        document.querySelector('.add').addEventListener('click', () => {
            document.querySelector('tbody').insertAdjacentHTML('afterbegin', createRow());
        });

        document.querySelector('#TableToExport').addEventListener('click', (event) => {
            const click = event.target;
            // console.log(click.closest('tr'));

            if (click.classList.contains('salvar')) {
                saveRow(click.closest('tr'));
            }
            else if (click.classList.contains('remove')) {
                const id = click.closest('tr').dataset.id;
                deleteRow(id);
                console.log(id);
            }
        })
        
    }


    function init() {
        events();
    }
    
    return {
        init
    }

})();

document.addEventListener('DOMContentLoaded', index.init);