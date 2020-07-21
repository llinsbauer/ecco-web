import * as React from "react";
import {AppState, useSharedState} from "../../states/AppState";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { FeatureModel } from "../../Domain/Model/Backend/FeatureModel";
import { FeatureResponse } from "../../Domain/Model/Backend/FeatureResponse";
import { DetailFeatureView } from "./Feature.Detail";

export const Feature : React.FC = () => {

    const [featureFilterText, setFeatureFilterText] = useState<string>("");
    const [appState, setAppState] = useSharedState();
    const [tmpCurrentFeature, setTmpCurrentFeature] = useState<FeatureModel>(null);

    let getCurrentFeatureExpression = () : JSX.Element[] => {
        return appState.features.map((feature: FeatureModel) => {
            let setCurrentFeature = () => {
                setTmpCurrentFeature(feature);
            }
            if (feature.name.includes(featureFilterText)) {
                return (
                    <a key={feature.name} onClick={setCurrentFeature} className={"list-group-item list-group-item-action"} >
                        {feature.name}
                    </a>
                );
            }
        }).filter((singleJSXElement: JSX.Element) => {
            return singleJSXElement != undefined || singleJSXElement != null;
        });
    }

    let features = getCurrentFeatureExpression();

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

    useEffect(() => {
        features = getCurrentFeatureExpression();
    }, [featureFilterText]);


    function setNewInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        setFeatureFilterText(event.target.value);
    }

    console.log(features);
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 mr-auto mb-3">
                            <div className="custom-input-searchfield">
                                <input onChange={setNewInputValue} value={featureFilterText} className="form-control" placeholder="Featurename for filtering..." type="text"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="list-group">
                                {features.length > 0 ? features : <p className={"text-center"}>Please consider using a different featurename to filter all features! There are no results!</p>}
                            </div>
                        </div>
                    </div>
                </div>
                {tmpCurrentFeature == null ? "" : <DetailFeatureView currentSelectedFeatureModel={tmpCurrentFeature} />}
            </div>
        </div>
    )
}