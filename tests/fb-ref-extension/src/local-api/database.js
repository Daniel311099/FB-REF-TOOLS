import { openDB } from 'idb'
// define queries
// define mutations

export const connectDB = () => {
    const dbPromise = openDB('selected', 3, {
        upgrade(db) {
            // scraped data
            const tableStore = db.createObjectStore('table', {keyPath: 'table_id'})
            const subjectsStore = db.createObjectStore('subject', {keyPath: 'subject_id'})
            const columnsStore =  db.createObjectStore('column', {keyPath: 'column_id'})
            const valuesStore = db.createObjectStore('value', {autoIncrement: true})
            // user entered data
            const customTablesStore = db.createObjectStore('custom_table', {keyPath: 'custom_table_id'})
            const customColumnsStore = db.createObjectStore('custom_column', {keyPath: 'custom_column_id'})
            const expressionsStore = db.createObjectStore('expression', {keyPath: 'expression_id'})
            const placeholdersStore = db.createObjectStore('placeholder', {autoIncrement: true})
            // link tables 
            const columnInstancesStore = db.createObjectStore('column_instance', {autoIncrement: true})
            const customColumnInstancesStore = db.createObjectStore('custom_column_instance', {autoIncrement: true})
            const subjectInstanceStore = db.createObjectStore('subject_instance', {autoIncrement: true})

            // indexes
            // scraped data
            tableStore.createIndex('name', 'name')

            subjectsStore.createIndex('name', 'name')

            columnsStore.createIndex('table', 'table_id')

            valuesStore.createIndex('column', 'column_id')
            valuesStore.createIndex('subject', 'subject_id')

            // user entered data
            customColumnsStore.createIndex('expression', 'expression_id')
            customColumnsStore.createIndex('name', 'name')

            placeholdersStore.createIndex('expression', 'expression_id')
            placeholdersStore.createIndex('column', 'column_id')
            placeholdersStore.createIndex('custom_column', 'custom_column_id')
            placeholdersStore.createIndex('custom', 'custom')

            // link tables
            columnInstancesStore.createIndex('custom_table', 'custom_table_id')
            columnInstancesStore.createIndex('column', 'column_id')

            customColumnInstancesStore.createIndex('custom_table', 'custom_table_id')
            customColumnInstancesStore.createIndex('custom_column', 'custom_column_id')
            
            subjectInstanceStore.createIndex('custom_table', 'custom_table_id')
            subjectInstanceStore.createIndex('subject', 'subject_id')
        }
    })
    return dbPromise
}

// create transactions
// add table
// add column