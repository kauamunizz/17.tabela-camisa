import '../styles/styles.scss';



document.getElementById("sheetjsexport").addEventListener('click', function() {
    /* Create worksheet from HTML DOM TABLE */
    var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
});

document.querySelector('.add').addEventListener('click', () => {
    document.querySelector('#TableToExport > tbody')
    .insertAdjacentHTML('afterend', createLinha())
})

function createLinha() {

    return /*html*/`
        <tr class='secundario'>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td>
                <button type="button">
                    <img class="remove" src="./public/imgs/icons8-remove-48.svg" alt="remover linha">
                </button>
            </td>
        </tr>
    `;
}

document.querySelector('#TableToExport').addEventListener('click', (event) => {
    const element = event.target;

    if (element.classList.contains('remove')) {
        element.closest('tr').remove();
    }
})
