// import { addColumn } from "../../../extension-app/public/localDB"
import { scrapeTableIds, scrapeColumnNames } from "./scraper"

export const getTableIds = () => {
    return scrapeTableIds()
}

export const getTables = () => {
    const tableIds = scrapeTableIds()
    const tables = tableIds.reduce((tables, tableId) => {
        return {...tables, [tableId]: scrapeColumnNames(tableId)}
    }, {})
    return tables
}

export const getColumnIds = (columns) => {
    
}
export const getCustomColumnIds = (columns) => {

}

// export const getCustomColumn = (column) => {
//     let columnDB = getCustomColumnDB(column) // defined in database.js
//     let shapedColumn = cleanColumn(columnDB) // defined in serializer.js, converts db query into json
//     return shapedColumn
// }

export const getColumns = (table) => {
    
}

export const getValues = (table, columns) => {
        
}

export const postCustomTable = (table) => {

}

// export const postCustomColumn = async (table, column) => {
//     let shapedColumn = cleanColumnAdd(table, column)
//     // let response = addColumn(shapedColumn)
//     // return response, resolve in react component
//     let response = await addColumn(shapedColumn)
//     let data = await response.json()
//     return data
// }

export const postSubject = (table, subject) => {

}