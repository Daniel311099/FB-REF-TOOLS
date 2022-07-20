import React, { useEffect, useMemo, useState } from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import evaluatex from 'evaluatex/dist/evaluatex';

function EditColumn(props: any) {
    const [latex, setLatex] = useState("");
    const placeholders = props.placeholders;

    const tempPlc = obj => {
        let out = {}
        Object.keys(obj).forEach(key => {
            out[key] = obj[key].value
            })
        return out
    }
    
    function parsePlcs(p: any): any {
        try {
            const fn = evaluatex(latex, { latex: true });
            let result = fn(tempPlc(p));
            return p
        } catch (e: any) {
            const splittedErr = String(e).split(' ')
            if (splittedErr.slice(3).join(' ') == 'is undefined or not a number') {
                const plc = splittedErr[2]
                console.log(e.name, (e.message), plc)
                let plcObj = p
                // plcObj[plc] = 2
                plcObj[plc] = {
                    value: 2,
                    name: '',
                    column: {
                        name: '',
                        parent_table: '',
                    },
                }
                return parsePlcs(plcObj)
            } else {
                console.log('invalid expression')
                console.log(p)
                return p
            }
        }
    }

    useEffect(() => {
        let newPlcs = parsePlcs({ ...placeholders })
        props.setPlaceholders(newPlcs)
    }, [latex])
    return (
        <div className="edit-column-body-row-left-body">
            <EditableMathField
                latex={latex}
                onChange={(mathfield) => {
                    setLatex(mathfield.latex())
                }}
            />
        </div>
    )
}