import React, { useEffect, useState } from "react";

export default function Home(props) {
    console.log('home', props.name)
    return (
        <div>
            {props.name ? 'Hi ' + props.name: 'Not logged in'}
        </div>
    )
}