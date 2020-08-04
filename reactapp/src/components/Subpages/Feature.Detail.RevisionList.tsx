import * as React from "react";
import {FeatureModel} from "../../Domain/Model/Backend/FeatureModel";
import {useEffect, useState} from "react";
import {FeatureVersionModel} from "../../Domain/Model/Backend/FeatureVersionModel";
import {CommunicationService} from "../../services/CommunicationService";
import {FeatureVersionResponse} from "../../Domain/Model/Backend/FeatureVersionResponse";
import {FeatureSpecificRevisionDetail} from "./Feature.Detail.RevisionDetail";
import {DetailFeatureView} from "./Feature.Detail";


interface FeatureSpecificRevisionProps {
    currentFeature: FeatureModel
}

export const FeatureSpecificRevisionList: React.FC<FeatureSpecificRevisionProps> = ({currentFeature}) => {

    const [featureRevisions, setFeatureRevisions] = useState<FeatureVersionModel[]>([]);
    const [currentFeatureRevision, setCurrentFeatureRevision] = useState<FeatureVersionModel>(null);

    useEffect(() => {
        CommunicationService.getInstance().getFeatureversionsFromFeature(currentFeature).then((featureVersionResponse: FeatureVersionResponse) => {
            setFeatureRevisions(featureVersionResponse.data);
        });
        setCurrentFeatureRevision(null);
    }, [currentFeature]);

    const featureRevisionsComponent = featureRevisions.map((featureVersion: FeatureVersionModel) => {
        let setCurrentFeatureRevisionCallback = () => {
            setCurrentFeatureRevision(featureVersion);
        }

        let validHTMLID = "validid" + featureVersion.version;

        return (
            <div key={validHTMLID} className="card">
                <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                        <button onClick={setCurrentFeatureRevisionCallback} className="btn btn-link btn-block text-center collapsed" type="button"
                                data-toggle="collapse" data-target={"#" + validHTMLID}>
                            {featureVersion.version}
                        </button>
                    </h2>
                </div>
                <div id={validHTMLID} className="collapse" data-parent="#featureVersionAccordionList">
                    {currentFeatureRevision == null ? "" : <FeatureSpecificRevisionDetail currentFeature={currentFeature} currentFeatureRevision={currentFeatureRevision} />}
                </div>
            </div>
        );
    });

    return (
        <div className="row">
            <div className="col-12">
                <h3 className="header">Aktuelle Featureversion zu {currentFeature.name}</h3>
                <div id={"featureVersionAccordionList"} className={"accordion"}>
                    {featureRevisionsComponent}
                </div>
            </div>
        </div>
    );
}
