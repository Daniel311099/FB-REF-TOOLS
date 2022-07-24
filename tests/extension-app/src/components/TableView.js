/*global chrome*/

import React, { useEffect, useState } from "react";
import { openDB } from "idb";


// import { getColumns } from "../../public/localDB";

export const TableView = (props) => {
    const table = props.table
    const columns = props.columns
    const setColumns = props.setColumns
    
    const updateColumns = () => {
        // const columnList = await getColumns(table)
        // console.log(columnList)
        // setColumns(columnList)
        const message = {
            message: 'get cols',
            table: table
        }
        const queryInfo = {
            active: true,
            currentWindow: true
        };
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
                message,
                (response) => {
                    const cols = response
                    // response.then((val) => {
                    //     console.log(val)
                    //     setColumns(val)
                    // })
                    console.log(cols, typeof(cols), cols.parent_table)
                    // cols.then(res => {
                    //     console.log(res)
                    // })
                    setColumns(cols)
                });
        });
    }

    useEffect(() => {
        updateColumns()
    }, [props.refresh])

    return (
        <div>
            <button onClick={() => {updateColumns()}}>show cols</button>
            {/* {JSON.stringify(columns)} */}
            <ul>
                {columns.map(col => {
                    return <li>{JSON.stringify(col)}</li>
                })}
            </ul>
        </div>
    )
}

// export const getColumns = async table => {chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
//     const currentTabId = tabs[0].id;
//     console.log(currentTabId)
//     /**
//      * Sends a single message to the content script(s) in the specified tab,
//      * with an optional callback to run when a response is sent back.
//      *
//      * The runtime.onMessage event is fired in each content script running
//      * in the specified tab for the current extension.
//      */
//     const columns = chrome.tabs.sendMessage(
//         currentTabId,
//         message_,
//         (response) => {
//             return response
//         });
//     return columns
// });
// }

