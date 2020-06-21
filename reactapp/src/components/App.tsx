import * as React from "react";
import { Approuter } from "./Approuter";
import { Provider } from "../GlobalState";
import { useState } from "react";

export const App: React.FC = () => {


    const [appState, setAppState] = useState({
        appState: 0
    });

    return (
        <Provider>
            <div className={"row"}>
                <Approuter />
            </div>
        </Provider>
    );
}