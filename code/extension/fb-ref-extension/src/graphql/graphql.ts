import gql from 'graphql-tag'
import { useQuery } from '@tanstack/react-query'
// import {useCustomTableQuery} from '../generated/graphql'
// const q = gql`
// query customTable{
//     customTable{
//         name
//         tabId
//         col
//     }
// }
// `
// const name = gql`
// query name{
//     customTable{
//         name
//     }
// }
// `

// const Posts = () => {
//     const {data} = useCustomTableQuery()
//     const a = data?.customTable.name
//     console.log(a)
//     // `data` is typed!
//     // …
//   }

let x:number = 2
let y: number = 8

// gql`
// query newQ {
//   compileStandardTableColumn(customTableId: 1, pageColumnId:1) {
//     id
//     name
//     custom
//     customTableId
//     exp
//   }
// }
// `