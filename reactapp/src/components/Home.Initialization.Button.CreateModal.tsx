import * as React from "react";
import { AppState, useSharedState } from "../states/AppState";
import {useEffect, useState} from "react";


interface ModalContainer {
    modelID: string
}

export const CreateModal : React.FC<ModalContainer> = ({modelID}) => {

    let jQueryHTMLIdentifier = "#" + modelID;

    let [inputValue, setInputValue] = useState("/media/marc/UbuntuData/EccoCREATEREPO");
    let [appState, setAppState] = useSharedState();

    const setValueInAppState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    let onModalDismiss = () => {
        $(jQueryHTMLIdentifier).modal("hide");
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            setAppState((prevState : AppState) => ({
                ...prevState,
                repoOperation: ""
            }));
        });
    }

    useEffect(() => {
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            $(jQueryHTMLIdentifier).modal("dispose");
        });
    }, [appState.repoOperation]);

    const saveDataInAppState = () => {
        $(jQueryHTMLIdentifier).modal("hide");
        $(jQueryHTMLIdentifier).on("hidden.bs.modal", () => {
            $(jQueryHTMLIdentifier).modal("dispose");
            setAppState((prevState: AppState) => ({
                ...prevState,
                directory: inputValue,
                repoOperation: "CREATE"
            }));
        });
    }

    return (
        <div className="modal fade" id={modelID} tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
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
                        <button type="button" onClick={saveDataInAppState} className="btn btn-success">Create Repository</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
