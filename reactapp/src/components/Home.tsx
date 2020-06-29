import * as React from "react";
import { useEffect } from "react";
import { AppState, useSharedState } from "../states/AppState";
import { CommunicationService } from "../services/CommunicationService";
import { HomeInitialization } from "./Home.Initialization";
import { StatusInformation } from "./Home.StatusInformation";
import { OperationResponse } from "../Domain/Model/OperationResponse";

export const Home : React.FC = () => {

    const [appState, setAppState] = useSharedState();

    useEffect(() => {
        if (appState.directory != "" && appState.repoOperation != "") {
            CommunicationService.getInstance().doOpenCloseRepositoryWithDirectory(appState.directory, appState.repoOperation).then((apiData: OperationResponse) => {
                console.log(apiData);
                setAppState((previousState: AppState) => ({
                    ...previousState,
                    eccoServiceIsInitialized: apiData.data.eccoServiceIsInitialized,
                    plugins: apiData.data.artifactPlugins,
                    repoOperation: ""
                }));
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
            });
        }
        // else {
        //     let communicationService = CommunicationService.getInstance();
        //     communicationService.corsTest().then((value) => {
        //         console.log(value);
        //     });
        //     console.log("Initialer State, kein Modal hat Daten eingegeben...");
        // }
    }, [appState.directory, appState.repoOperation])

    return (
        <div className="col-12">
            <div className="row">
                {
                    !appState.eccoServiceIsInitialized ?
                    <HomeInitialization /> :
                    <StatusInformation />
                }
            </div>
        </div>
    );
}