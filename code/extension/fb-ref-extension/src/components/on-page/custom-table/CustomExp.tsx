import React, { useEffect, useState } from "react";
import {StaticMathField} from "react-mathquill";
function CustomExp(props: any) {
    const latex = props.latex
    return (
        <StaticMathField>
            {latex}
        </StaticMathField>
    )
}

export default CustomExp;