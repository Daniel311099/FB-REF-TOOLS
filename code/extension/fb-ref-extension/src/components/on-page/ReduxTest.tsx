import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpAction } from "../../store/customColumnsSlice"; 

export default function ReduxTest() {
    const dispatch = useDispatch()
    const exp = useSelector((state:any) => state.exp)
    const handler = (e:any): any => {
        return dispatch(setExpAction(e.target.value))
    }
    return <div>ReduxTest</div>;
}