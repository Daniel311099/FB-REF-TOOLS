import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColumnAction } from "../../store/stats";

export default function ReduxTest() {
    const dispatch = useDispatch()
    const column = useSelector((state:any) => state.column)
    const handler = (e:any): any => {
        return dispatch(setColumnAction(e.target.value))
    }
    return <div>ReduxTest</div>;
}