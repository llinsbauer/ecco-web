import * as React from "react";
import { AppState, useSharedState } from "../../states/AppState";


export const Artifact: React.FC = () => {
    let [appState, setAppState] = useSharedState();

    return (
        <div className="col-12">
            <h1>State-Analyse</h1>
            <div className="row">
                <div className="col-6">Something else to seee</div>
                <div className="col-6">Something else to seee</div>
            </div>
        </div>
    );
}