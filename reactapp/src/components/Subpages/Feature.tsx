import * as React from "react";
import {AppState, useSharedState} from "../../states/AppState";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { FeatureModel } from "../../Domain/Model/FeatureModel";
import { FeatureResponse } from "../../Domain/Model/FeatureResponse";
import { FeatureListItem } from "./Feature.ListItem";

export const Feature : React.FC = () => {

    const [appState, setAppState] = useSharedState();

    useEffect(() => {
        console.log("Featuresbeschreibung wurden geupdatet...", appState.features);
        CommunicationService.getInstance().updateFeaturesInBackend(appState.features).then((apiData: FeatureResponse) => {
            console.log(apiData);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
        });
    }, [[...appState.features].map((walkerFeature) => walkerFeature.description)]);

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
        return <FeatureListItem key={feature.name} feature={feature} />
    });

    return (
        <div className="col-12">
            <div className="row">
                {features}
            </div>
        </div>
    )
}