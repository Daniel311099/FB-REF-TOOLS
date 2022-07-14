/* global chrome */
import React, { useState, useEffect } from "react";
import { ShadowRoot } from "./ShadowRoot";
import styled from "styled-components";

import CreateTableForm from "./CreateTableForm";
import EditColumn from "./EditColumn";

import appStyles from '../App.css'
import mathquillStyles from '../mathquill.css'

const Container = styled.div`
  color: red;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

// base columns for custom columns should be scraped from the current page

const Menu = (props) => {

    const [placeholders, setPlaceholders] = useState({})

    console.log("chr ext")
    // useEffect(() => {
    //     const clickListener = (e) => {
    //       if (e.shiftKey) {
    //         console.log("shift key pressed");
    //       }
    //     };
    //     document.addEventListener("click", clickListener);
    //     return () => document.removeEventListener("click", clickListener);
    //   }, []);

    // useEffect(() => {
    //     const quillLink = document.createElement('link');
    //     document.head.appendChild(quillLink);
    //     quillLink.rel = 'stylesheet';
    //     quillLink.href = '../../mathquill-0.10.1/mathquill.css';
    //     const quillScript = document.createElement('script');
    //     document.head.appendChild(quillScript);
    //     quillScript.src = '../../mathquill-0.10.1/mathquill.js';
    //     const ajaxScript = document.createElement('script');
    //     document.head.appendChild(ajaxScript);
    //     ajaxScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
    //     const quillScript2 = document.createElement('script');
    //     document.head.appendChild(quillScript2);
    //     quillScript2.src = '../../mathquill-0.10.1/ajaxScript.js';
    // }, [])

    

    return (
        <ShadowRoot>
            <Container>
                {/* <link rel="stylesheet" href="./App.css"></link> */}
                {/* <style type="text/css">{appStyles}</style> */}
                <div style={mathquillStyles}>
                    <CreateTableForm /> <br />
                    <EditColumn placeholders={placeholders} setPlaceholders={setPlaceholders} />
                </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
            </Container>

            {/* <div>
                <style>{mathquillStyles}</style>
            </div> */}
        </ShadowRoot>
    );
}


export default Menu