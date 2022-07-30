import { pageColumn, PageTable } from "../store/dataSlice"

const scrapeTableIds = () => {
    let tables = document.getElementsByTagName('table')
    let tableList = Array.from(tables)
    console.log(tableList, 'here')
    
    let tablesIds = tableList.map(table => table.id)
    tablesIds = tablesIds.filter(tableId => Boolean(tableId))
    console.log(tablesIds)
    return tablesIds
}

const scrapeColumnNames = (table: string): pageColumn[] => {
    let tableEl = document.getElementById(table)
    console.log(tableEl, 'tableEl', table)
    if (!tableEl) {return []}
    let tableHeads = tableEl.getElementsByTagName('thead')
    console.log(tableHeads, 'tableHead')
    if (!tableHeads){return []}
    let tableHead = tableHeads[0]
    let headRow = Array.from(tableHead.getElementsByTagName('tr')).slice(-1)[0]
    const columns = (headRow ? headRow.getElementsByTagName('th') : [])
    console.log(columns)
    const columnsNames = Array.from(columns).map(column => {
        return {
            id: column.getAttribute('data-stat'),
            name: column.innerText,
            table_id: table,
        }
    })
    return columnsNames
}

export const getTables = (): {[key: string]: PageTable} => {
    const tableIds = scrapeTableIds()
    const tables = tableIds.reduce((tables, tableId) => {
        return {...tables, [tableId]: {
            id: tableId,
            name: tableId,
            columns: scrapeColumnNames(tableId),
        }}
    }, {})
    return tables
}
