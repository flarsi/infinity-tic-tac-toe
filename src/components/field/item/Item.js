import React, {useContext, useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {FieldContext} from "../../../context/fieldContext/FieldContext";
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {checkToWin} from "../../../helpers/middlewares/FieldMiddleware";

export const Item = ({index}) => {
    const field = useContext(FieldContext)

    const [item, setItem] = useState()

    const [disable, setDisable] = useState(false)

    useEffect(() => {
        setItem(field.data.field[index.x][index.y])
    }, [field, item, index])


    const setChar = () => {
        if (!disable) {
            if (field.data.turn === 'cross') {
                field.setChar({...index, newValue: 'cross'})
            } else if (field.data.turn === 'circle') {
                field.setChar({...index, newValue: 'circle'})
            }

            field.setWinner(checkToWin(field.data.field, field.data.combo, index))

            field.changeTurn()
            setDisable(true)
        }
    }

    return (
        <IconButton className="item" onClick={setChar} disabled={disable}>
            {
                (
                    item === 'cross' &&
                    <CloseIcon/>
                )
                ||
                (
                    item === 'circle' &&
                    <RadioButtonUncheckedIcon/>
                )
            }
        </IconButton>
    )
}