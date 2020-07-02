import * as React from "react";
import {FeatureModel} from "../../Domain/Model/FeatureModel";
import {useEffect, useState} from "react";
import {FeatureVersionModel} from "../../Domain/Model/FeatureVersionModel";
import {CommunicationService} from "../../services/CommunicationService";
import {FeatureVersionResponse} from "../../Domain/Model/FeatureVersionResponse";
import {FeatureSpecificRevisionDetail} from "./Feature.Detail.RevisionDetail";


interface FeatureSpecificRevisionProps {
    currentFeature: FeatureModel
}

export const FeatureSpecificRevisionList: React.FC<FeatureSpecificRevisionProps> = ({currentFeature}) => {

    const [featureRevisions, setFeatureRevisions] = useState<FeatureVersionModel[]>([]);
    const [currentFeatureRevision, setCurrentFeatureRevision] = useState<FeatureVersionModel>(null);

    useEffect(() => {
        CommunicationService.getInstance().getFeatureversionsFromFeature(currentFeature).then((featureVersionResponse: FeatureVersionResponse) => {
            setFeatureRevisions(featureVersionResponse.data);
            console.log("aktuell angefrage Featureversion", featureVersionResponse.data);
        });
        setCurrentFeatureRevision(null);
    }, [currentFeature]);

    const featureRevisionsComponent = featureRevisions.map((featureVersion: FeatureVersionModel) => {
        let setCurrentFeatureRevisionCallback = () => {
            setCurrentFeatureRevision(featureVersion);
        }

        return (
            <a key={featureVersion.version} onClick={setCurrentFeatureRevisionCallback} className={"list-group-item list-group-item-action"} >
                {featureVersion.version}
            </a>
        );
    });

    return (
        <div className="row mt-4">
            <div className="col-12">
                <h3 className="header">Aktuelle Featureversion zu {currentFeature.name}</h3>
                <div className="list-group">
                    {featureRevisionsComponent}
                </div>
                {currentFeatureRevision == null ? "" : <FeatureSpecificRevisionDetail currentFeature={currentFeature} currentFeatureRevision={currentFeatureRevision} />}
            </div>
        </div>
    );
}