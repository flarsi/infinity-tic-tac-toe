import React from "react";
import {createContext, useReducer} from "react";
import {CANGETURN, NEWGAME, SETCHAR, SETRULES, SETWINNER} from "./FieldTypes";
import {getRules} from "../../helpers/middlewares/FieldMiddleware";

export const FieldContext = createContext()

export const FieldProvider = ({children}) => {
    const initialState = {
        size: null,
        combo: null,
        field: [[]],
        turn: null,
        winner: null
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case SETRULES:
                return {...state, ...action.payload};
            case CANGETURN:
                return {...state, turn: action.payload};
            case SETCHAR:{
                state.field[action.payload.x][action.payload.y] = action.payload.newValue
                return state;
            }case SETWINNER:{
                console.log(action.payload)
                return {...state, winner: action.payload};
            }case NEWGAME:{
                return initialState;
            }
            default:
                throw new Error();
        }
    }

    const [data, dispatch] = useReducer(reducer, initialState);

    const setRules = (size) => {
        dispatch(
            {
                type: SETRULES,
                payload: getRules(size)
            }
        )
    }

    const changeTurn = () => {

        let turn = data.turn

        if (turn === 'cross') {
            turn = 'circle'
        } else if (turn === 'circle') {
            turn = 'cross'
        }

        dispatch({type: CANGETURN, payload: turn})
    }

    const setChar = ({x, y, newValue}) => {

        dispatch({type: SETCHAR, payload: {x, y, newValue}})
    }

    const setWinner = (winner) => {
        dispatch({type: SETWINNER, payload: winner})
    }

    const newGame = () => {
        dispatch({type: NEWGAME})
    }

    const reduceMethods = {
        setRules,
        changeTurn,
        setChar,
        setWinner,
        newGame
    }

    return (
        <FieldContext.Provider value={{data, ...reduceMethods}}>
            {children}
        </FieldContext.Provider>
    )
}