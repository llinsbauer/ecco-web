//Modal-Container, der einen Dialog erstellen soll zum Erstellen eines neuen Repos (ecco init...)

import * as React from "react";
import { AppState, useSharedState } from "../states/AppState";
import { useEffect } from "react";
import { CreateModal } from "./Home.Initialization.Button.CreateModal";

export const CreateModalButton : React.FC = () => {

    const modalId : string = "createRepositoryModal";
    const jQueryHTMLIdentifier = "#" + modalId;

    let [appState, setAppState] = useSharedState();

    let onOpenModal = () => {
        $(jQueryHTMLIdentifier).modal("show");
    }

    useEffect(() => {
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            setAppState((prevState : AppState) => ({
                ...prevState,
                repoOperation: ""
            }));
        });
    });

    return (
        <div className="row">
            <div className="col-12">
                <button type={"button"} className="btn btn-primary" onClick={onOpenModal}>
                    Create Repository
                </button>
                {(appState.repoOperation == "" && !appState.eccoServiceIsInitialized) ? <CreateModal modelID={modalId} /> : null}
            </div>
        </div>
    );
}
