import * as React from "react";
import { AppState, useSharedState } from "../states/AppState";
import {useEffect, useState} from "react";

interface ModalContainer {
    modalID: string
}

export const OpenModal : React.FC<ModalContainer> = ({modalID}) => {

    let [inputValue, setInputValue] = useState("/home/marc/TestRepoForEcco/Repo2");
    let [appState, setAppState] = useSharedState();

    let jQueryHTMLIdentifier = "#" + modalID;

    let onModalDismiss = () => {
        $(jQueryHTMLIdentifier).modal("hide");
    }

    //Backdrop-Effekt, wenn kein Button gedrückt wird...
    useEffect(() => {
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            $(jQueryHTMLIdentifier).modal("dispose");
        });
    });

    const setValueInAppState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const saveDataInAppState = () => {
        $(jQueryHTMLIdentifier).modal("hide");
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            $(jQueryHTMLIdentifier).modal("dispose");
            setAppState((prevState: AppState) => ({
                ...prevState,
                directory: inputValue,
                repoOperation: "OPEN"
            }));
        });
    }

    return (
        <div className="modal fade" id={modalID} tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Open Existing Repository</h5>
                        <button type="button" className="close" onClick={onModalDismiss} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-row">
                                <div className="col-12">
                                    <label htmlFor="baseDirectoryOpenRepo">Base Directory</label>
                                    <input id={"baseDirectoryOpenRepo"}
                                           className={"form-control"}
                                           placeholder={"Base Directory to Repository..."}
                                           value={inputValue}
                                           type="text"
                                           onChange={setValueInAppState}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" onClick={onModalDismiss} className="btn btn-danger">Close</button>
                        <button type="button" onClick={saveDataInAppState} className="btn btn-success">Open Repository</button>
                    </div>
                </div>
            </div>
        </div>
    );
}