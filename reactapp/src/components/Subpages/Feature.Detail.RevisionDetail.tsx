import * as React from "react";
import {useState} from "react";
import {FeatureModel} from "../../Domain/Model/FeatureModel";
import {CommunicationService} from "../../services/CommunicationService";
import {FeatureVersionModel} from "../../Domain/Model/FeatureVersionModel";
import {FeatureVersionResponse} from "../../Domain/Model/FeatureVersionResponse";

interface FeatureDetailRevisionDetailProps {
    currentFeatureRevision: FeatureVersionModel
    currentFeature: FeatureModel
}

export const FeatureSpecificRevisionDetail : React.FC<FeatureDetailRevisionDetailProps> = ({currentFeatureRevision, currentFeature}) => {

    const [successButtonDisabled, setSuccessButtonDisabled] = useState<boolean>(true);
    const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);
    const [tmpCurrentFeatureModel, setTmpCurrentFeatureModel] = useState<FeatureVersionModel>({
        version: currentFeatureRevision.version,
        description: currentFeatureRevision.description
    });

    const changeFeatureDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.persist();
        setSuccessButtonDisabled(currentFeatureRevision.description == event.target.value)
        setResetButtonDisabled(currentFeatureRevision.description == event.target.value)
        setTmpCurrentFeatureModel((previousState: FeatureVersionModel) => ({
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
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
        CommunicationService.getInstance().updateFeatureversionFromFeature(currentFeature, tmpCurrentFeatureModel)
            .then((featureVersionResponse: FeatureVersionResponse) => {
            console.log("Response ist angekommen");
        });
    }

    const resetChangesToInitialState = () => {
        setTmpCurrentFeatureModel(currentFeatureRevision);
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="m-3">
                    <label htmlFor={tmpCurrentFeatureModel.version}>Description of {tmpCurrentFeatureModel.version}</label>
                    <textarea id={tmpCurrentFeatureModel.version}
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
    );

}