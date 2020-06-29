import * as React from "react";
import { FeatureModel } from "../../Domain/Model/FeatureModel";
import { useEffect, useState } from "react";
import { AppState, useSharedState } from "../../states/AppState";

interface FeatureProperty {
    feature: FeatureModel
}

export const FeatureListItem: React.FC<FeatureProperty> = ({feature}) => {

    const [appState, setAppState] = useSharedState();
    const [successButtonDisabled, setSuccessButtonDisabled] = useState<boolean>(true);
    const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);

    const [tmpFeature, setTmpFeature] = useState<FeatureModel>({
        name: feature.name,
        description: (feature.description == null ? "" : feature.description)
    });

    const changeFeatureDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.persist();
        setSuccessButtonDisabled(feature.description == event.target.value)
        setResetButtonDisabled(feature.description == event.target.value)
        setTmpFeature((previousState) => ({
            ...previousState,
            description: event.target.value
        }));
    }

    const saveChangesInAppState = () => {
        setAppState((previousState: AppState) => ({
            ...previousState,
            features: previousState.features.map(walkerFeature => (walkerFeature.name == tmpFeature.name) ?
                {...walkerFeature, description: tmpFeature.description} :
                walkerFeature
            )
        }));
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
    }

    const resetChangesToInitialState = (event: React.MouseEvent) => {
        setTmpFeature(() => ({
            ...tmpFeature,
            description: (feature.description == null ? "" : feature.description),
        }));
        setSuccessButtonDisabled(true);
        setResetButtonDisabled(true);
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <h3>{tmpFeature.name}</h3>
                </div>
                <div className="card-body">
                    <div className="m-3">
                        <label htmlFor={tmpFeature.name}>Description of {tmpFeature.name}</label>
                        <textarea id={tmpFeature.name}
                                  value={(tmpFeature.description == null ? "" : tmpFeature.description)}
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
    );
};