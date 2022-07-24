/*global chrome*/
import React, { useEffect, useState, lazy } from "react";
import ReactDOM from 'react-dom/client';

import Menu from "./components/Menu";
import ColumnSelector from "./components/ui-controls/ColumnSelector";
import ColumnSelectorRow from "./components/ui-controls/ColumnSelectorRow";
import { getTableIds, getTables } from "./local-api/api";

import { connectDB } from "./local-api/database";
import { a } from "./local-api/serializers";
console.log(a)
// var database = require('./local-api/database.js')
// var database = lazy(() => import('./local-api/database.js'))
// var connectDB = database.connectDB
// import main from "./local-api/main";

const Listen = (props) => {
    const [message, setMessage] = useState("");
    const [currentUrl, setCurrentUrl] = useState("")
    const [selectedColumns, setSelectedColumns] = useState([])
    const [tables, setTables] = useState({}) // store references to all tables on the page
    
    // define event listeners here
    // call handlers from scraper.js in callbacks
    const updateColumns = (req) => {
        if (req.add){
            setSelectedColumns(selectedColumns => {
                return [...selectedColumns, req.column]
            })
        } else {
            setSelectedColumns(selectedColumns => {
                return selectedColumns.filter(column => {
                    return column != req.column
                })
            })
        }
    }
    const wrap = (wrapper, el) => {
        console.log(el.parentNode)
        // wrapper.style['all'] = 'inherit'
        // wrapper.style['scope'] = 'col'
        // wrapper.style['class'] = el.classList
        // wrapper.style['dat-over-header'] = el.getAttribute('data-over-header')
        // wrapper.style['data-tip'] = el.getAttribute('data-tip')
        // Object.assign(wrapper.style, {
        //     all: 'inherit',
        //     scope: 'col',
        //     class: el.classList,
        //     'data-over-header': el.getAttribute('data-over-header'),
        //     'data-tip': el.getAttribute('data-tip'),
        // })
        // wrapper.style['all'] = 'inherit'
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        console.log(wrapper)
        // el.parentNode.removeChild(el)
        // move el into wrapper
        // for (let index = 0; index < els.length; index++) {
        //     const el = els[index];
        //     wrapper.appendChild(el);
        //     el.parentNode.removeChild(el)
        // }
    }
    const getColumnData = columns => {
        const colArray = Array.from(columns)
        const colData = colArray.map(column => {
            return {
                name: column.innerText,
                class: column.classList,
                data_over_header: column.getAttribute('data-over-header'),
                data_tip: column.getAttribute('data-tip'),
                data_stat: column.getAttribute('data-stat'),
                table_id: column.parentNode.parentNode.parentNode.id
            }
        })
        return colData
    }
    const addColumnSelectors = table => {
        // const tableEl = document.getElementById(table)
        // console.log(table, 'table')
        const headRow = Array.from(table.getElementsByTagName('thead')[0]
                               .getElementsByTagName('tr')).slice(-1)[0]
        
        const columns = headRow.getElementsByTagName('th')
        const columnData = getColumnData(columns)
        // console.log(columnData, 456)
        const rowDiv = document.createElement('tr')
        rowDiv.id = table.id + '-column-selector-row'
        // add td for each columnData to rowDiv
        columnData.forEach(column => {
            const td = document.createElement('th')
            td.id = table.id + '-column-selector-' + column.data_stat
            td.key = td.id
            // td.height = headRow.height
            rowDiv.appendChild(td)
        })
        headRow.parentNode.insertBefore(rowDiv, headRow)
        // let rowRoot = ReactDOM.createRoot(rowDiv)
        // rowRoot.render(
        //     <React.StrictMode>
        //         <ColumnSelectorRow columns={columnData} table={table.id} />
        //     </React.StrictMode>
        // )
        for (let index = 0; index < columnData.length; index++) {
            const column = columnData[index];
            const rootEl = document.getElementById(table.id + '-column-selector-' + column.data_stat)
            const root = ReactDOM.createRoot(rootEl)
            root.render(
                <React.StrictMode>
                    <ColumnSelector column={column} table={table.id} />
                </React.StrictMode>
            )
        }
    }
        // create root row and insert it
        // render row of mapped ColumnSelectorRow elements
        // const colList = Array.from(columns)
        // console.log(colList, 7)
        // Array.prototype.foreach(columns, column => {
        //     let columnDiv = document.createElement('div')
        //     columnDiv.id = table.id + column
        //     // wrap column with columnSelectorDiv
        //     let columnSelectorDiv = document.createElement('div')
        //     columnSelectorDiv.classList.push('selector')
        //     wrap(columnDiv, [columnSelectorDiv])
        //     // columnDiv.insertBefore(columnSelectorDiv, column)
        //     let colRoot = ReactDOM.createRoot(columnSelectorDiv)
        //     colRoot.render(
        //         <React.StrictMode>
        //             <ColumnSelector table={table.id} column={column} updateColumns={updateColumns}/>
        //         </React.StrictMode>
        //     )
        // })
    
    // const addColumnSelectors = table => {
    //     // const tableEl = document.getElementById(table)
    //     console.log(table, 'table')
    //     const headRow = Array.from(table.getElementsByTagName('thead')[0]
    //                            .getElementsByTagName('tr')).slice(-1)[0]
        
    //     const columns = headRow.getElementsByTagName('th')
    //     // const columnData = getColumnData(columns)
    //     // console.log(columnData, 456)
    //     // const rowDiv = document.createElement('tr')
    //     // rowDiv.id = table.id + '-column-selector-row'
    //     // // add td for each columnData to rowDiv
    //     // columnData.forEach(column => {
    //     //     const td = document.createElement('th')
    //     //     td.id = table.id + '-column-selector-' + column.name
    //     //     td.height = headRow.height
    //     //     rowDiv.appendChild(td)
    //     // })
    //     // headRow.parentNode.insertBefore(rowDiv, headRow)
    //     // let rowRoot = ReactDOM.createRoot(rowDiv)
    //     // rowRoot.render(
    //     //     <React.StrictMode>
    //     //         <ColumnSelectorRow columns={columnData} table={table.id} />
    //     //     </React.StrictMode>
    //     // )
    //     // create root row and insert it
    //     // render row of mapped ColumnSelectorRow elements
    //     for (let index = 0; index < columns.length; index++) {
    //         const column = columns[index];
    //         // let columnDiv = document.createElement('div')
    //         // columnDiv.id = table.id + column.getAttribute('data-stat')
    //         // columnDiv.style['all'] = 'inherit'
    //         // columnDiv.scope = 'col'
    //         // columnDiv.class = column.classList
    //         // columnDiv['dat-over-header'] = column.getAttribute('data-over-header')
    //         // columnDiv['data-tip'] = column.getAttribute('data-tip')
    //         // wrap(columnDiv, column)
    //         // wrap column with columnSelectorDiv
    //         let columnSelectorDiv = document.createElement('div')
    //         columnSelectorDiv.classList.add('selector')
    //         // console.log('wrap')
    //         column.appendChild(columnSelectorDiv)
    //         // column.parentNode.insertBefore(columnSelectorDiv, column)
    //         let colRoot = ReactDOM.createRoot(columnSelectorDiv)
    //         colRoot.render(
    //             <React.StrictMode>
    //                 <ColumnSelector table={table.id} column={column}/>
    //             </React.StrictMode>
    //         )
    //     }
    //     // const colList = Array.from(columns)
    //     // console.log(colList, 7)
    //     // Array.prototype.foreach(columns, column => {
    //     //     let columnDiv = document.createElement('div')
    //     //     columnDiv.id = table.id + column
    //     //     // wrap column with columnSelectorDiv
    //     //     let columnSelectorDiv = document.createElement('div')
    //     //     columnSelectorDiv.classList.push('selector')
    //     //     wrap(columnDiv, [columnSelectorDiv])
    //     //     // columnDiv.insertBefore(columnSelectorDiv, column)
    //     //     let colRoot = ReactDOM.createRoot(columnSelectorDiv)
    //     //     colRoot.render(
    //     //         <React.StrictMode>
    //     //             <ColumnSelector table={table.id} column={column} updateColumns={updateColumns}/>
    //     //         </React.StrictMode>
    //     //     )
    //     // })
    // }
    const addUiControls = () => {
        let tables = document.getElementsByTagName('table')
        // let tabList = Array.from(tables)
        // console.log(tabList)
        // const emptyTable = document.createElement('table')
        // document.body.appendChild(emptyTable)
        for (let index = 0; index < tables.length; index++) {
            const table = tables[index];
            if (table.getElementsByTagName('thead')[0]){
                addColumnSelectors(table)
            }
        }

        // tabList.foreach(table => {
        //     // same for subjects
        // })
    }
    const loadData = async () => {
        // let connected = connectDB().then((res) => {
        //     // get latest data from idb and set state
        // }).catch((err) => {
        //     console.log(err)
        //     // try again
        // })
        // let response = await connectDB()
        // let content = await response.json()
        // if (content.success) {
        //     // get latest data from idb and set state
        // } else {
        //     // try again
        // }
        const tables = getTables()
        console.log(tables, 'tables')
        // return tables
        setTables(tables)
    }
    useEffect(() => {
        addUiControls();
        loadData()
        // set url
    }, [])
    return (
        <Menu message={message} tables={tables} />
        // <div></div>
    )
}

export default Listen;