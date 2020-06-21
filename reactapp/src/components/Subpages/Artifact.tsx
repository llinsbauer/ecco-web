import * as React from "react";
import { GlobalState, useSetState, useTrackedState } from "../../GlobalState";

export const Artifact: React.FC = () => {
    const myGlobalState: GlobalState = useTrackedState();
    const setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>> = useSetState();

    return (
        <div className="col-12">
            <h1>State-Analyse</h1>
            <div className="row">
                <div className="col-6">{ myGlobalState.repositoryDirectory }</div>
                <div className="col-6">{ myGlobalState.repositoryIsInitialized }</div>
            </div>
        </div>
    );
}