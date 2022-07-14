import React, {useEffect, useMemo, useState} from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import evaluatex from 'evaluatex/dist/evaluatex';
addStyles()
// import '../mathquill.css'
// add bracket matching

const EditColumn = (props) => {
    const [latex, setLatex] = useState('')
    const placeholders = props.placeholders;
    let plcs = {}
    console.log(plcs)
    plcs = getPlcs(plcs)
    // plcs = useMemo(() => {
    //     console.log('plc update', plcs)
    //     // return Object.keys(placeholders)
    //     return getPlcs({}).keys()
    // }, [latex])
    function calcPlcs() {
        let calcedPlcs = getPlcs({...placeholders})
        console.log(calcedPlcs)
        let out = calcedPlcs
        console.log(out)
        // calcedPlcs.then(out => {
        //     console.log(out)
        // })
        // setPlaceholders(out)
        return(out)
    }
    useEffect(() => {
        console.log('plc update', placeholders)
        // return Object.keys(placeholders)
        // const calcPlcs = async () => {
        //     let calcedPlcs = await getPlcs(placeholders)
        //     let out = await calcedPlcs
        //     console.log(out)
        //     setPlaceholders(out)
        //     // return calcedPlcs
        // }
        let out = calcPlcs()
        props.setPlaceholders(out)
        console.log(out, latex)
        // return out
    }, [latex])

    const tempPlc = obj => {
        let out = {}
        Object.keys(obj).forEach(key => {
            out[key] = obj[key].value
            })
        return out
    }

    function getPlcs(p) { // p is the partial plc object that gets updated on each iteration
        console.log(p)
        try{ // p starts as an empty object and grows with each itter as params are filled in
            console.log(p)
            const fn = evaluatex(latex, {latex: true});
            // const result2 = fn(placeholders)
            let result1 = fn(tempPlc(p))
            console.log(result1)
            // setPlaceholders(p => p)
            return p
        } catch(e) {
            console.log(String(e))
            const splittedErr = String(e).split(' ')
            if (splittedErr.slice(3).join(' ') == 'is undefined or not a number') {
                const plc = splittedErr[2]
                console.log(e.name, (e.message), plc)
                let plcObj = p
                // plcObj[plc] = 2
                plcObj[plc] = {
                    value: 2,
                    name: ''
                }
                return getPlcs(plcObj)
            } else if (false) { // error is zero div or similar, add condition
                console.log('zero div error')
            } else {
                console.log('invalid expression')
                console.log(p)
                return p
            }
        }
    }
    // let plcList = []
    // plcList = useMemo(() => {
    //     console.log(placeholders)
    //     return (
    //         Object.keys(placeholders).map(plc => {
    //             return (
    //                 <li key={plc}>
    //                     <h1>{plc}</h1>
    //                     <input type="dropdown" />
    //                 </li>
    //             )
    //         })
    //     )
    // }, [placeholders])

    // useEffect(() => {
    //     // let plcs = getPlcs(latex)
    //     getPlcs({})
    //     // updatePlc(placeholders)
    // }, [latex])

    return (
        <div>
            <EditableMathField  
                latex={latex}
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
            /> <br/>
            {/* <ul>
                {plcList}
            </ul> */}
        </div>
    )
}

export default EditColumn