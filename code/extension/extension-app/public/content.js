// console.log('working')
// window.alert('fb ref')


/*global chrome*/

// const validateSender = (
//     message: ChromeMessage,
//     sender: chrome.runtime.MessageSender
// ) => {
//     return sender.id === chrome.runtime.id && message.from === Sender.React;
// }

const messagesFromReactAppListener = (
    message,
    sender,
    response
) => {

    const isValidated = true

    if (isValidated && message.message === 'stats') {
        // window.alert('worked')
        // console.log(message, response)
        // const newDiv = document.createElement("h1");
        // newDiv.innerText = "Hello World!"
        // document.body.append(newDiv)
        let stats = document.getElementById('div_stats_squads_standard_for')
        console.log(stats)

        response(stats.innerHTML);
    }

    if (isValidated && message.message === 'click') {
        makeClickable()
        let stats = document.getElementById('div_stats_squads_standard_for')
        console.log(stats)
        response('clickable')
    }

    // if (isValidated && message.message === "delete logo") {
    //     const logo = document.getElementById('hplogo');
    //     logo?.parentElement?.removeChild(logo)
    // }
}

const addClick = (el) => {
    el.addEventListener("click", () => {
        let stat = el.getAttribute('data-stat')
        let statsDiv = document.getElementById('div_stats_squads_standard_for')
        let statsTable = statsDiv.getElementsByTagName('table')[0]
        let cells = statsTable.querySelectorAll('[data-stat="'+stat+'"]')
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
    let statsDiv = document.getElementById('div_stats_squads_standard_for')
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
    for (let index = 0; index < tableBody.getElementsByTagName('tr').length; index++) {
        const row = tableBody.getElementsByTagName('tr')[index];
        const rowCells = row.getElementsByTagName('td')
        for (let index = 0; index < rowCells.length; index++) {
            const cell = rowCells[index];
            addClick(cell)
        }
    }
}
const main = () => {
    console.log('[content.ts] Main')
    makeClickable()
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

main();