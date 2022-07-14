// define event listeners
// scrape stats from webpage, passes to some serializer then adds result to the database
// dfine click handlers

const scrapeStats = async (tableId) => {
    const table = document.getElementById(tableId)
    const stats = table.getElementsByTagName('tr')
    // const statsJSON = stats.map(row => {
    //     return row.getElementsByTagName('td').map(cell => {
    //         return {stat: cell.innerText}
    //     })
    // })
    // const statsJson = toJson(table)
    // const statsDB = toDB(statsJson)
    // add statsDB to database
    // notify react
}

export const scrapeTableIds = () => {
    let tables = document.getElementsByTagName('table')
    tables = Array.from(tables)
    console.log(tables)
    
    let tablesIds = tables.map(table => table.id)
    tablesIds = tablesIds.filter(tableId => Boolean(tableId))
    console.log(tablesIds)
    return tablesIds
}

export const scrapeColumnNames = table => {
    let tableEl = document.getElementById(table)
    console.log(tableEl, 'tableEl', table)
    let tableHead = tableEl.getElementsByTagName('thead')
    console.log(tableHead, 'tableHead')
    tableHead = tableHead[0]
    if (!tableHead){return []}
    let headRow = Array.from(tableHead.getElementsByTagName('tr')).slice(-1)[0]
    const columns = (headRow ? headRow.getElementsByTagName('th') : [])
    console.log(columns)
    const columnsNames = Array.from(columns).map(column => {
        return {
            name: column.getAttribute('data-stat'),
            table: table,
        }
    })
    return columnsNames
}

export const addListeners = () => {
    const tables = document.getElementsByName('table')
    for (let i = 0; i < tables.length; i++) {
        tables[i].addEventListener('click', () => {
            scrapeStats()
        })
    }
}