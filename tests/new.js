let tables = {
    'standard': [
        {column: 'abc', table: 'standard'},
        {column: 'def', table: 'standard'},
        {column: 'ghi', table: 'standard'},
    ]
}

let placeholders = {
    a: {
        column: {
            name: 'abc',
            table: 'standard',
        }
    },
    b: {
        column: {
            name: 'def',
            table: 'standard',
        }
    }
}

const update = (plc, column) => {
    let plcObj = placeholders
    plcObj = {...plcObj, [plc]: {
        ...plcObj[plc],
        column: column
    }}
    console.log(plcObj)
    // return plcObj
}

update('a', {
    name: 'def',
    table: 'standard',
})