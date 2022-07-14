import { addColumn } from "../../../extension-app/public/localDB"


export const getColumnIds = (columns) => {
    
}
export const getCustomColumnIds = (columns) => {

}

export const getCustomColumn = (column) => {
    let column = getCustomColumnDB(column) // defined in database.js
    let shapedColumn = cleanColumn(column) // defined in serializer.js, converts db query into json
    return shapedColumn
}

export const getColumns = (table) => {
    
}

export const getValues = (table, columns) => {
        
}

export const postCustomTable = (table) => {

}

export const postCustomColumn = async (table, column) => {
    let shapedColumn = cleanColumnAdd(table, column)
    // let response = addColumn(shapedColumn)
    // return response, resolve in react component
    let response = await addColumn(shapedColumn)
    let data = await response.json()
    return data
}

export const postSubject = (table, subject) => {

}