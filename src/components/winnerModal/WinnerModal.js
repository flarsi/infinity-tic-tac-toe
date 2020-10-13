import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {ModalContext} from "../../context/modalContext/ModalContext";
import {FieldContext} from "../../context/fieldContext/FieldContext";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        top: "50%",
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));




export const WinnerModal = () => {

    const classes = useStyles();

    const modal = useContext(ModalContext)
    const field = useContext(FieldContext)

    function goHome() {
        field.newGame()
        window.location.href = '/';
    }

    function newGame() {
        field.newGame()
        modal.close()
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Winner: {field.data.winner && field.data.winner}</h2>
            <p id="simple-modal-description">
                {modal.data.text && modal.data.text}
            </p>
            <div>
                <Button onClick={goHome} variant="contained" color="primary">
                    Go home
                </Button>
                <Button onClick={newGame} variant="contained" color="secondary">
                    New Game
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Modal
                open={modal.data.open}
                onClose={modal.close}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
