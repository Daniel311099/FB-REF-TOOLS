//Ap.js

import React, { useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux'
import fetchPosts from './FetchApi';
import './App.css';
import { getTables } from './local-api/scraper';
import { addTable } from './store/dataSlice';
import CustomTable from './components/on-page/custom-table/CustomTable';

import {useTableNameQuery, useNewQQuery} from './generated/graphql'

type user = {
    name: String
}

// type data = {
//     data: any
//     error: any
//     isLoading: boolean
//     isError: boolean
// }

// inject ui controls here
// wrap menu in shadow root

function App() {
    // const [data, setData] = useState<any>({})
    // const [isLoading, setIsLoading] = useState<boolean | null>(null)
    
    useEffect(() => {
        const {data, error, isLoading, isError} = useNewQQuery({customTableId: 2}) 
        data?.compileStandardTableColumn.name

    }, [])
    // console.log(data?.customTable.col, 12345)


    useScrapePageTables()

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    // if (isError) {
    //     return <div>Error! {error.message}</div>
    // }

    // console.log(data?.customTable.name, 111333)
    
    return (
        <div className=''>
            {/* <h1 className='container'>Users Name</h1>
            {
                data.map((users: user, id: any) => {
                    return <li className='container' key={id}>{users.name}</li>
                })
            } */}
            <CustomTable/>
        </div>
    )
}
    
export default App;

const getPageTables = () => {
    const tables = getTables()
    const tableList = Object.keys(tables).map(table_id => tables[table_id])
    return tableList
}

const useScrapePageTables = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const tables = getPageTables()
        for (let index = 0; index < tables.length; index++) {
            const table = tables[index];
            dispatch(addTable(table))
        }
    })

}