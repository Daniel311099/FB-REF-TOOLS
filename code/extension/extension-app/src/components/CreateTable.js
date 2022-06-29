import React, {useState} from "react";
import {toTex, Fraction} from 'algebra.js' 
// import MathJax from 'react-mathjax2';
import CreateColumn from "./EditColumn";
import NewTableForm from "./NewTableForm";
import {MathJax} from 'better-react-mathjax';

const Context = MathJax.Context;
const Node = MathJax.Node;

export default function CreateTable(props) {
    const [columns, setColumns] = useState([])
    const [activeColumn, setActiveColumn] = useState('')
    const [buildingTable, setBuildingTable] = useState(false)

    const a = new Fraction(1, 5);
  const b = new Fraction(2, 7);
  const answer = a.multiply(b);

  const question = <Formula tex={`${toTex(a)} × ${toTex(b)} = ${toTex(answer)}`} />;


    return (
        <div>
            {/* {!buildingTable && <NewTableForm />}
            <CreateColumn /> */}
            {question}
        </div>
    );
}

function Formula(props) {
    return (
      <Context input="tex">
        <Node inline>{props.tex}</Node>
      </Context>
    );
  }
  