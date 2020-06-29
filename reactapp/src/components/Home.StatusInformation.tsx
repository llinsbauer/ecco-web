import * as React from "react";
import { AppState, useSharedState } from "../states/AppState";
import {StatusInformationPlugin} from "./Home.StatusInformation.Plugins";
import {ReducedArtifactPlugin} from "../Domain/Model/ReducedArtifactPlugin";

export const StatusInformation : React.FC  = () => {

    const REPO_DIRECTORY_PART = "/.ecco";
    const PLUGIN_INFORMATION_ACCORDION_ID = "pluginInformationAccordion";

    const [appState, setAppState] = useSharedState();

    const closeRepositoryOperation = () => {
        console.log("Funktioniere!!!");
        setAppState((previousState: AppState) => ({
            ...previousState,
            repoOperation: "CLOSE"
        }));
    }

    const statusInformationPlugins =
        appState
            .plugins
            .map((plugin: ReducedArtifactPlugin) => {
                const validArtifactID = plugin.pluginID.replace(/[^a-zA-Z0-9]/g, '');
                return <StatusInformationPlugin key={validArtifactID} artifactPlugin={plugin} parentID={PLUGIN_INFORMATION_ACCORDION_ID} />
            });

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            Status Information
                        </div>
                        <div className="card-body text-right">
                            <p className={"card-text text-left"}>
                                <label htmlFor="baseDirectory">Base Directory</label>
                                <input id={"baseDirectory"} type={"text"} className={"form-control"} readOnly={true} value={appState.directory} />
                            </p>
                            <p className={"card-text text-left"}>
                                <label htmlFor="repoDirectory">Repository Directory</label>
                                <input id={"repoDirectory"}  type={"text"} className={"form-control"} readOnly={true} value={appState.directory + REPO_DIRECTORY_PART} />
                            </p>
                            <button className={"btn btn-primary"} type={"button"} onClick={closeRepositoryOperation}>Close Repository</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="accordion" id={PLUGIN_INFORMATION_ACCORDION_ID}>
                        {statusInformationPlugins}
                    </div>
                </div>
            </div>
        </div>
    );
}