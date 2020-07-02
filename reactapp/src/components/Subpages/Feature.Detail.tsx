import * as React from "react";
import { AppState, useSharedState } from "../../states/AppState";
import {useEffect, useState} from "react";
import { FeatureModel } from "../../Domain/Model/FeatureModel";
import {CommunicationService} from "../../services/CommunicationService";
import {FeatureResponse} from "../../Domain/Model/FeatureResponse";
import {FeatureSpecificRevisionList} from "./Feature.Detail.RevisionList";

interface DetailViewProps {
    currentSelectedFeatureModel: FeatureModel
}

export const DetailFeatureView : React.FC<DetailViewProps> = ({currentSelectedFeatureModel}) => {

    const [successButtonDisabled, setSuccessButtonDisabled] = useState<boolean>(true);
    const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);
    const [appState, setAppState] = useSharedState();
    const [tmpCurrentFeatureModel, setTmpCurrentFeatureModel] = useState<FeatureModel>({
        name: currentSelectedFeatureModel.name,
        description: currentSelectedFeatureModel.description
    });

    useEffect(() => {
        //...dann wurde eine Kopie von tmpCurrentFeature gemacht und die neue Description aus dem Textarea
        // wird in das neue Objekt reingeschrieben, erst dann will ich den Request raussenden...
        CommunicationService.getInstance().updateFeatureInBackend(tmpCurrentFeatureModel).then((apiData: FeatureResponse) => {
            setAppState((previousState: AppState) => ({
                ...previousState,
                features: apiData.data
            }));
        }).catch((error) => {
            console.log(error);
        }).finally(() => {

        });
    }, [appState.currentFeature.description]);

    useEffect(() => {
        setTmpCurrentFeatureModel(currentSelectedFeatureModel);
    }, [currentSelectedFeatureModel]);

    const changeFeatureDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.persist();
        setSuccessButtonDisabled(currentSelectedFeatureModel.description == event.target.value)
        setResetButtonDisabled(currentSelectedFeatureModel.description == event.target.value)
        setTmpCurrentFeatureModel((previousState: FeatureModel) => ({
            ...previousState,
            description: event.target.value
        }));
    }

    const saveChangesInAppState = () => {
        // setAppState((previousState: AppState) => ({
        //     ...previousState,
        //     features: previousState.features.map(walkerFeature => (walkerFeature.name == tmpCurrentFeature.name) ?
        //         {...walkerFeature, description: tmpCurrentFeature.description} :
        //         walkerFeature
        //     )
        // }));
        setAppState((previousState: AppState) => ({
            ...previousState,
            currentFeature: tmpCurrentFeatureModel
        }));
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
    }

    const resetChangesToInitialState = () => {
        setTmpCurrentFeatureModel(currentSelectedFeatureModel);
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
    }

    return (
        <div className="col-6">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="m-3">
                                <label htmlFor={tmpCurrentFeatureModel.name}>Description of {tmpCurrentFeatureModel.name}</label>
                                <textarea id={tmpCurrentFeatureModel.name}
                                          value={(tmpCurrentFeatureModel.description == null ? "" : tmpCurrentFeatureModel.description)}
                                          className={"form-control"}
                                          onChange={changeFeatureDescription} />
                            </div>
                            <div className="m-3 d-flex justify-content-between">
                                <button type={"button"} className={"btn btn-success"} disabled={successButtonDisabled} onClick={saveChangesInAppState}>
                                    Save Changes
                                </button>
                                <button type={"button"} className={"btn btn-danger"} disabled={resetButtonDisabled} onClick={resetChangesToInitialState}>
                                    Reset to Initial State
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <FeatureSpecificRevisionList currentFeature={currentSelectedFeatureModel} />
                </div>
            </div>
        </div>
    );

 };