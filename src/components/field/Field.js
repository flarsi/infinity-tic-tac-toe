import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {FieldContext} from "../../context/fieldContext/FieldContext";
import {Item} from "./item/Item";
import {PlayerTurn} from "./playerTurn/PlayerTurn";
import {GoBack} from "./goBack/GoBack";
import {ModalContext} from "../../context/modalContext/ModalContext";

export const Field = () => {
    const params = useParams()
    const field = useContext(FieldContext)
    const modal = useContext(ModalContext)

    useEffect(() => {
        if(field.data.field.length > 30){
            document.getElementById("field").style.transform = "scale(0.5)"
        }

        if (!field.data.combo) {
            field.setRules(params.fieldSize)
        }

        if(field.data.winner && !modal.data.open){
            modal.open()
        }

    }, [params, field, modal])

    return (
        <div>
            <GoBack/>
            <div id={"field"}>
                {
                    field.data.field && field.data.field.map(
                        (elem, x) => (
                            <div className="row" key={x}>
                                {
                                    elem.map((elem, y) => (
                                        <Item key={y} index={{x, y}}>{}</Item>
                                    ))
                                }
                            </div>
                        )
                    )
                }
                <PlayerTurn/>
            </div>
        </div>
    )

}