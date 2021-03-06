/*global chrome*/
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { TableView } from './components/TableView';
import CreateTable from './components/CreateTable';
import EditColumn from './components/EditColumn';

function App() {
    const [url, setUrl] = useState('g');
    const [responseFromContent, setResponseFromContent] = useState('');
    const [message, setMessage] = useState('stats')
    const [columns, setColumns] = useState([])
    const [reloadCols, setReloadCols] = useState(true)

    useEffect(() => {
        const queryInfo = { active: true, lastFocusedWindow: true };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url_ = tabs[0].url;
            setUrl(url_);
            console.log(tabs)
        });
    }, []);

    const URL = 'http://localhost:8000/scraper_api/stats'

    const sendStats = async (data) => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            // sameSite: 'none',
            body: JSON.stringify(data)
        })
        const content = await response.json()
        console.log(content)
    }

    useEffect(() => {
        // sendStats()
    }, [responseFromContent])

    const sendTestMessage = () => {
        const message_ = {
            // from: Sender.React,
            message: message,
        }

        const queryInfo = {
            active: true,
            currentWindow: true
        };

        /**
         * We can't use "chrome.runtime.sendMessage" for sending messages from React.
         * For sending messages from React we need to specify which tab to send it to.
         */
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const currentTabId = tabs[0].id;
            console.log(currentTabId)
            /**
             * Sends a single message to the content script(s) in the specified tab,
             * with an optional callback to run when a response is sent back.
             *
             * The runtime.onMessage event is fired in each content script running
             * in the specified tab for the current extension.
             */
            chrome.tabs.sendMessage(
                currentTabId,
                message_,
                (response) => {
                    setResponseFromContent(response);
                    console.log(response, 'res')
                    sendStats(response)
                });
        });
    };

    chrome.runtime.onMessage.addListener((message, sender, respose) => {
        console.log(message)
        setReloadCols(!reloadCols)
        respose('notify worked')
    })
    
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {url}
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button onClick={sendTestMessage}>click</button>
                <input onChange={(e) => {setMessage(e.target.value)}}></input>
                <TableView table="my_table" columns={columns} setColumns={setColumns} refresh={reloadCols}/>
                {/* <CreateTable /> */}
                <EditColumn />
            </header>
        </div>
    );
}

export default App;

