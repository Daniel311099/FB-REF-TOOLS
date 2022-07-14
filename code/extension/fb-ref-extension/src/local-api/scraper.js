// define event listeners
// scrape stats from webpage, passes to some serializer then adds result to the database
// dfine click handlers

const scrapeStats = async () => {
    const table = document.getElementById(TABLE_NAME)
    const stats = table.getElementsByTagName('tr')
    // const statsJSON = stats.map(row => {
    //     return row.getElementsByTagName('td').map(cell => {
    //         return {stat: cell.innerText}
    //     })
    // })
    const statsJson = toJson(table)
    const statsDB = toDB(statsJson)
    // add statsDB to database
    // notify react
}

export const addListeners = () => {
    const tables = document.getElementsByName('table')
    for (let i = 0; i < tables.length; i++) {
        tables[i].addEventListener('click', () => {
            scrapeStats()
        })
    }
}