import React from 'react';
import './App.scss';
import {StartBtns} from "./components/startBtns/StartBtns";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Field} from "./components/field/Field";
import {FieldProvider} from "./context/fieldContext/FieldContext";
import {WinnerModal} from "./components/winnerModal/WinnerModal";
import {ModalProvider} from "./context/modalContext/ModalContext";

function App() {

    const pages = [
        {
            name: 'start',
            link: '/',
            component: StartBtns
        },
        {
            name: 'field',
            link: '/field/:fieldSize',
            component: Field
        },
    ]

    return (
        <div className="App">
            <FieldProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Switch>
                            {pages.map((element) => (
                                <Route key={element.name} path={element.link} exact component={element.component}/>
                            ))}
                        </Switch>
                    </BrowserRouter>
                    <WinnerModal/>
                </ModalProvider>
            </FieldProvider>
        </div>
    );
}

export default App;
