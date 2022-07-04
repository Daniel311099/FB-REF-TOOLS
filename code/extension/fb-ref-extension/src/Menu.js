/* global chrome */
import React, { useState, useEffect } from "react";  
import { ShadowRoot } from "./ShadowRoot";
import styles from './cssMod.module.css' 
import styled from "styled-components";

const Container = styled.div`
  color: red;
`;


const Menu = (props) => {

    console.log("chr ext")
    useEffect(() => {
        const clickListener = (e) => {
          if (e.shiftKey) {
            console.log("shift key pressed");
            // setNotes((prevNotes) => [...prevNotes, { x: e.pageX, y: e.pageY }]);
          }
        };
        document.addEventListener("click", clickListener);
        return () => document.removeEventListener("click", clickListener);
      }, []);

    return (
        <ShadowRoot>
            <link rel="stylesheet" href="./App.css"></link>
            <Container>
                <section>
                    <h1>Standard Columns</h1>
                    <ul>
                        <li>
                            awldfk
                        </li>
                        <li>
                            lsdmvl
                        </li>
                    </ul>
                </section>
            </Container>
        </ShadowRoot>
    );
}


export default Menu