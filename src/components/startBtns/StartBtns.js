import React from "react";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";


export const StartBtns = () => {
    const history = useHistory();

    const handleField = (fieldSize) => {
        history.push("/field/"+fieldSize);
    }

    return (
        <div className="start-btns">
            <Button onClick={() => {
                handleField(3)
            }} variant="contained" color="primary">
                Start 3x3
            </Button>
            <Button onClick={() => {
                handleField(50)
            }} variant="contained" color="secondary">
                Start 50x50
            </Button>
        </div>
    )
}