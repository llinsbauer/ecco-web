import * as React from "react";
import {AppState, useSharedState} from "../../states/AppState";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { FeatureModel } from "../../Domain/Model/FeatureModel";
import { FeatureResponse } from "../../Domain/Model/FeatureResponse";
import { DetailFeatureView } from "./Feature.Detail";

export const Feature : React.FC = () => {

    const [appState, setAppState] = useSharedState();
    const [tmpCurrentFeature, setTmpCurrentFeature] = useState<FeatureModel>(null);

    useEffect(() => {
        CommunicationService.getInstance().getFeatures().then((apiData: FeatureResponse) => {
            setAppState((previousState) => ({
                ...previousState,
                features: apiData.data
            }));
        }).catch((error : any) => {
            console.log(error)
        }).finally(() => {

        });
    }, []);

    const features = appState.features.map((feature: FeatureModel) => {
        let setCurrentFeature = () => {
            setTmpCurrentFeature(feature);
        }

        return (
            <a key={feature.name} onClick={setCurrentFeature} className={"list-group-item list-group-item-action"} >
                {feature.name}
            </a>
        );
    });

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-6">
                    <div className="list-group">
                        {features}
                    </div>
                </div>
                {tmpCurrentFeature == null ? "" : <DetailFeatureView currentSelectedFeatureModel={tmpCurrentFeature} />}
            </div>
        </div>
    )
}