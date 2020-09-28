import * as React from "react";
import { useSharedState } from "../../states/AppState";
import { useEffect } from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { FeatureResponse } from "../../Domain/Model/Backend/FeatureResponse";
import { FeatureList } from "./Feature.List";
import { RevisionPerFeature } from "../Charts/Home.RevisionPerFeature";

export const Feature : React.FC = () => {

    const [appState, setAppState] = useSharedState();
    useEffect(() => {
        CommunicationService.getInstance().getFeatures().then((apiData: FeatureResponse) => {
            setAppState((previousState) => ({
                ...previousState,
                features: apiData.data
            }));
        });
    }, []);

    return (
        <div className="col-12">
            <FeatureList />
            <RevisionPerFeature />
        </div>
    )
}
