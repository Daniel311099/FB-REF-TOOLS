
import { connectDB, addSubject, addColumn, getColumns } from "./localDB.js"
/*global chrome*/

// const validateSender = (
//     message: ChromeMessage,
//     sender: chrome.runtime.MessageSender
// ) => {
//     return sender.id === chrome.runtime.id && message.from === Sender.React;
// }

// add subject_id to row

// const TABLE_NAME = 'div_stats_squads_standard_for'
const TABLE_NAME = 'div_stats_standard'

function messagesFromReactAppListener (
    message,
    sender,
    response
) {

    const isValidated = true

    if (isValidated && message.message === 'stats') {
        // window.alert('worked')
        // console.log(message, response)
        // const newDiv = document.createElement("h1");
        // newDiv.innerText = "Hello World!"
        // document.body.append(newDiv)
        let statsHTML = document.getElementById(TABLE_NAME)
        console.log(statsHTML)
        let body = statsHTML.getElementsByTagName('table')[0]
            .getElementsByTagName('tbody')[0]
            .getElementsByTagName('tr')
        console.log(body)
        let statsJSON = Array.prototype.slice.call(body).map((row) => {
            let rowData = {}
            Array.prototype.slice.call(row.getElementsByTagName('td')).forEach(cell => {
                let col = cell.getAttribute('data-stat')
                switch(col) {
                    case 'player':
                        rowData.player_id = cell.getAttribute('data-append-csv')
                        break
                    case 'squad':
                        let teamURL = cell.getElementsByTagName('a')[0]
                            .getAttribute('href')
                        let teamID = teamURL.split('/')[3]
                        rowData.team_id = teamID
                }
                rowData[col] = cell.innerText
            });
            let subject = row.getElementsByTagName('th')[0]
            rowData[subject.getAttribute('data-stat')] = subject.innerText
            return rowData
        })
        console.log(statsJSON)

        response(statsJSON);
    }

    if (isValidated && message.message === 'click') {
        makeClickable()
        let stats = document.getElementById(TABLE_NAME)
        console.log(stats)
        response('clickable')
    }

    if (isValidated && message.message === 'get cols') {
        const columns = getColumns(message.table).then(function (cols) {
            console.log(cols)
            response(cols)
        })
        return true
    }
}

const resCols = async (prom) => {
    let cols = await prom
    console.log(cols)
    return cols
}

// add update classes method

const addClick = (el) => {
    el.addEventListener("click", () => {
        let stat = el.getAttribute('data-stat')
        console.log(stat)
        let statsDiv = document.getElementById(TABLE_NAME)
        let statsTable = statsDiv.getElementsByTagName('table')[0]
        let cells = statsTable.querySelectorAll('[data-stat="'+stat+'"]')
        var colObj = {
            name: stat,
            parent_table: 'table_name',
            table: 'my_table'
        }
        addColumn(colObj)
        chrome.runtime.sendMessage({message: 'notify react'}, (res) => {
            console.log(res)
        })
        // notify react
        const toggleFunc = (cells[0].classList.contains('select') ? 
            (element) => {element.classList.remove('select')} : 
            (element) => {element.classList.add('select')})
        for (let index = 0; index < cells.length; index++) {
            const element = cells[index];
            toggleFunc(element)
        }
    })
}

const makeClickable = () => {
    let statsDiv = document.getElementById(TABLE_NAME)
    console.log(statsDiv)
    // let statsTable = statsDiv.getElementsByTagName('table')[0]
    let tableHead = statsDiv.getElementsByTagName('thead')[0]
    let nameHeads = tableHead.getElementsByTagName('tr')[1]
    nameHeads = nameHeads.getElementsByTagName('th')
    // let names = nameHeads.map(stat => {stat.getAttribute('data-stat')})

    let tableBody = statsDiv.getElementsByTagName('tbody')[0]
    for (let index = 0; index < nameHeads.length; index++) {
        const name = nameHeads[index]
        addClick(name)
        // let cells = statsTable.getElementsByClassName()
        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];
            
        // }
    }
    console.log(tableBody)
    for (let index = 0; index < tableBody.getElementsByTagName('tr').length; index++) {
        const row = tableBody.getElementsByTagName('tr')[index];
        const rowCells = row.getElementsByTagName('td')
        for (let index = 0; index < rowCells.length; index++) {
            const cell = rowCells[index];
            addClick(cell)
        }
    }
}
export function main () {
    console.log('[content.ts] Main')
    makeClickable()
    connectDB()
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
    
}

main();