import * as React from "react";
import {useEffect} from "react";
import {CommunicationService} from "../../services/CommunicationService";
import {AssociationResponse} from "../../Domain/Model/Backend/AssociationResponse";
import {AppState, useSharedState} from "../../states/AppState";
import {AssociationModel} from "../../Domain/Model/Backend/AssociationModel";
import {AssociationInspection} from "../../Domain/Model/Frontend/AssociationInspection";
import {ArtifactsPerAssociation} from "../Charts/Home.ArtifactsPerAssociation";
import {ArtifactsPerDepth} from "../Charts/Home.ArtifactsPerDepth";
import {ModulesPerOrder} from "../Charts/Home.ModulesPerOrder";

export const Association: React.FC = () => {

    const [appState, setAppState] = useSharedState();

    useEffect(() => {
        CommunicationService.getInstance().getAssociations().then((associationResponse: AssociationResponse) => {
            let selectableAssociations: AssociationInspection[] = [];
            associationResponse.data.forEach((tmpAssociation: AssociationModel, index: number) => {
                selectableAssociations[index] = new AssociationInspection(tmpAssociation);
            });
            setAppState((previousState: AppState) => ({
                ...previousState,
                associations: selectableAssociations
            }));
        });
    }, []);

    const associations = appState.associations.map((association: AssociationInspection) => {

        let validHTMLID = "validid" + association.selectableAssociation.association;

        return (
            <div key={validHTMLID} className="card">
                <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-center collapsed" type="button"
                                data-toggle="collapse" data-target={"#" + validHTMLID}>
                            {association.selectableAssociation.association}
                        </button>
                    </h2>
                </div>
                <div id={validHTMLID} className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                        Yet another Informationaccordion to show some Information about the associations...
                        <div className="row">
                            <div className="col-12">
                                <p>AssocationID</p>
                                <p>{association.selectableAssociation.association}</p>
                            </div>
                            <div className="col-12">
                                <p>simpleModuleCondition</p>
                                <p>{association.selectableAssociation.simpleModuleCondition}</p>
                            </div>
                            <div className="col-12">
                                <p>simpleModuleRevisionCondition</p>
                                <p>{association.selectableAssociation.simpleModuleRevisionCondition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="accordion" id="accordionExample">
                        {associations}
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <div className={"d-flex justify-content-center"} id="artifactsperassociation">
                        <ArtifactsPerAssociation />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <div className={"d-flex justify-content-center"} id="artifactsperdepth">
                        <ArtifactsPerDepth />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <div className={"d-flex justify-content-center"} id="modulesperorder">
                        <ModulesPerOrder />
                    </div>
                </div>
            </div>
        </div>
    );
};
