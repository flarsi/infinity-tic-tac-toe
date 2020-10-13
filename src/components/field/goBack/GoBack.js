import React, {useContext} from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {FieldContext} from "../../../context/fieldContext/FieldContext";

export const GoBack = () => {

    const field = useContext(FieldContext)

    function goHome() {
        field.newGame()
        window.location.href = '/';
    }

    return(
        <IconButton className="go-back" onClick={goHome}>
            <ExitToAppIcon/>
        </IconButton>
    )
}