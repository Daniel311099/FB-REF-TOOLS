import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
// test with vanilla indexdb
// set up webpack

// custom table
// table = {
//     subject type,
//     name:,
// }
// custom column = {
//     regex:
//     table:
// }
// column = {
//     parent table:
//     name:
//     custom column:
//     placeholder
// }
// competitions = {
//     name,
//     scope: domestic || continental || intercontinental
//     countries?
// }
// countries = {
//     name,
// }
// leagues = {
//     country,
//     division,
//     name
// }
// comp teams = {
//     team,
//     comp
// }
// teams = {
//     league
// }
// players = {
//     name
// }

// subject = {
//     subject type,
//     name,
//     league?

// }

export const connectDB = () => {
    const dbPromise = openDB('selected', 3, {
        upgrade(db) {
            const tableStore = db.createObjectStore('tables', {keyPath: 'name'})
            const subjectsStore = db.createObjectStore('subjects', {keyPath: 'subject_id'})
            const columnsStore =  db.createObjectStore('columns', {keyPath: 'name'})
            const valuesStore = db.createObjectStore('values', {autoIncrement: true})
            // store subject type as a global var
            // subjectsStore.createIndex('name', 'name')
            // valuesStore.createIndex('value', 'value')
            columnsStore.createIndex('table', 'table')
            valuesStore.createIndex('column', 'column')
            valuesStore.createIndex('subject', 'subject')
            db.add('tables', 'my_table')
        }
    })
}

export const addSubject = async subject => {
    const db = await openDB('selected', 3)
    db.add('subjects', subject)
}
// add remove column


export const addColumn = async column => {
    const db = await openDB('selected', 3)
    db.add('columns', column)
}

export const getColumns = async table => {
    const db = await openDB('selected', 3)
    const tx = db.transaction('columns', 'readwrite');
    console.log(tx)
    const columnsStore = tx.objectStore('columns')
    console.log(columnsStore)
    var columnsCursor = await columnsStore.index('table').openCursor()
    var output = []
    while(columnsCursor) {
        if (columnsCursor.key == table) {
            output.push(columnsCursor.value)
        }
        columnsCursor = await columnsCursor.continue()
    }
    // console.log(columns)
    await tx.done
    return output
}