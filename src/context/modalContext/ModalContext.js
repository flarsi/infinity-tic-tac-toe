import React from "react";
import {createContext, useReducer} from "react";
import {CLOSE, OPEN, SETTEXT} from "./ModalTypes";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const initialState = {
        open: false,
        text: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case OPEN:
                return {...state, open: true};
            case CLOSE:
                return {...state, open: false};
            case SETTEXT: {
                return {...state, text: action.payload};
            }
            default:
                throw new Error();
        }
    }

    const [data, dispatch] = useReducer(reducer, initialState);

    const open = () => {
        dispatch({type: OPEN})
    }

    const close = () => {
        dispatch({type: CLOSE})
    }

    const setText = (text) => {
        dispatch({type: SETTEXT, payload: text})
    }

    const reduceMethods = {
        open,
        close,
        setText,
    }

    return (
        <ModalContext.Provider value={{data, ...reduceMethods}}>
            {children}
        </ModalContext.Provider>
    )
}