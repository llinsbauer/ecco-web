import * as React from "react";
import { Approuter } from "./Approuter";
import { SharedStateProvider } from "../states/AppState";

export const App: React.FC = () => {

    return (
        <SharedStateProvider>
            <div className={"row"}>
                <Approuter />
            </div>
        </SharedStateProvider>
    );
}