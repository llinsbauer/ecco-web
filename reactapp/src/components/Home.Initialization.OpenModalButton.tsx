import * as React from "react";
import { AppState, useSharedState } from "../states/AppState";
import { useEffect } from "react";
import { OpenModal } from "./Home.Initialization.Button.OpenModal";


export const OpenModalButton : React.FC = () => {

    const modalID = "openRepositoryModal";
    const jQueryHTMLIdentifier = "#" + modalID;

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
                    Open Repository
                </button>
                {(appState.repoOperation == "" && !appState.eccoServiceIsInitialized) ? <OpenModal modalID={modalID} /> : null}
            </div>
        </div>
    );
}