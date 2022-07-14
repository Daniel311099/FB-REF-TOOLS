import React, { useState } from "react";
import root from "react-shadow";
import { StyleSheetManager } from "styled-components";
import appStyles from '../App.css'
import cssMod from '../cssMod.module.css'

export const ShadowRoot = ({ children }) => {
    const [stylesNode, setStylesNode] = useState(null);
    // console.log(stylesNode, 1)
    return (
        <root.div>

            <div ref={(node) => setStylesNode(node)}>
                {stylesNode &&
                    <StyleSheetManager target={stylesNode}>{children}</StyleSheetManager>
                }
            </div>
        </root.div>
    );
};
