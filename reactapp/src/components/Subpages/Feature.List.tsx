import * as React from "react";
import {AppState, useSharedState} from "../../states/AppState";
import {useEffect, useState} from "react";
import {FeatureModel} from "../../Domain/Model/Backend/FeatureModel";
import {FeatureSpecificRevisionList} from "./Feature.Detail.RevisionList";
import {DetailFeatureView} from "./Feature.Detail";

export const FeatureList : React.FC = () => {

    const [appState, setAppState] = useSharedState();
    const [featureFilterText, setFeatureFilterText] = useState<string>("");
    const [tmpCurrentFeature, setTmpCurrentFeature] = useState<FeatureModel>(null);

    const setCurrentFeatureForRevision = (selectedFeature: FeatureModel) => {
        setTmpCurrentFeature(selectedFeature);
    }

    const setNewInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeatureFilterText(event.target.value);
    }

    const getCurrentFeatureExpression = () : JSX.Element[] => {
        return appState.features.map((feature: FeatureModel) => {
            if (feature.name.includes(featureFilterText)) {
                let validHTMLID = "validid" + feature.name;
                return (
                    <div key={validHTMLID} className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button onClick={() => {setCurrentFeatureForRevision(feature)}} className="btn btn-link btn-block text-center collapsed" type="button"
                                        data-toggle="collapse" data-target={"#" + validHTMLID}>
                                    {feature.name}
                                </button>
                            </h2>
                        </div>
                        <div id={validHTMLID} className="collapse" data-parent="#featureAccordionList">
                            <DetailFeatureView currentSelectedFeatureModel={feature} />
                        </div>
                    </div>
                );
            }
        }).filter((singleJSXElement: JSX.Element) => {
            return singleJSXElement != undefined || singleJSXElement != null;
        });
    }
    let features = getCurrentFeatureExpression();
    return (
        <>
            <div className="row">
                <div className="col-6 mr-auto mb-3">
                    <div className="custom-input-searchfield">
                        <input onChange={setNewInputValue} value={featureFilterText} className="form-control" placeholder="Featurename for filtering..." type="text"/>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    <h3 className={"header"}>Alle Features</h3>
                    <div id="featureAccordionList" className="accordion">
                        {features.length > 0 ? features : <p className={"text-center"}>Please consider using a different featurename to filter all features! There are no results!</p>}
                    </div>
                </div>
                <div className="col-6">
                    {tmpCurrentFeature == null ? "" : <FeatureSpecificRevisionList currentFeature={tmpCurrentFeature} />}
                </div>
            </div>
        </>
    );

}
