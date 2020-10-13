import React, {useContext} from "react";
import {FieldContext} from "../../../context/fieldContext/FieldContext";

export const PlayerTurn = () => {
    const field = useContext(FieldContext)

    return(
        <div className="player-turn">
                <h1>{field.data.turn && field.data.turn} turn</h1>
        </div>
    )
}