import * as React from "react";
import { AppState, useSharedState } from "../../states/AppState";
import {useEffect, useRef} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { AssociationResponse } from "../../Domain/Model/Backend/AssociationResponse";
import { AssociationInspection } from "../../Domain/Model/Frontend/AssociationInspection";
import { AssociationModel } from "../../Domain/Model/Backend/AssociationModel";
import { ArtefactResponse } from "../../Domain/Model/Backend/ArtefactResponse";
import { ArtefactTree } from "./Artefact.ArtefactTree";
import {ArtifactGraphChart} from "../Charts/Artifact.GraphChart";

export const Artifact: React.FC = () => {

    let [appState, setAppState] = useSharedState();

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

    useEffect(() => {
        //Erstelle ein Array an Assoziationen, die ausgewählt wurden...
        let selectedAssociations: AssociationModel[] =
            appState.associations
                .map<AssociationModel>((selectableAssociation: AssociationInspection) => {
                    if (selectableAssociation.isAssociationSelected) {
                        return selectableAssociation.selectableAssociation;
                    }
                })
                //Filtere die Elemente raus, die nicht selektiert wurden...
                .filter((selectedAssociation: AssociationModel) => {
                    return (selectedAssociation !== undefined && selectedAssociation !== null);
                });
        //Mache Request an API, um Artefaktbaum auf Grund der ausgewählten Assoziationen zu bekommen...
        //Aktuell muss unterschieden werden, ob Assoziationen ausgewählt wurden oder nicht...
        CommunicationService.getInstance().getArtifactsByAssociation(selectedAssociations).then((artefactResponse: ArtefactResponse) => {
            console.table(artefactResponse.data);
            setAppState((previousState: AppState) => ({
                ...previousState,
                artifactTree: artefactResponse.data
            }))
        });
    }, [
        appState.associations
    ]);

    const dropdownAssociationSelectionMenu = appState.associations.map((singleAssociationInspection: AssociationInspection) => {
        let validAssociationID = "validID" + singleAssociationInspection.selectableAssociation.associationID;

        const handleChangeOnSelect = () => {
            setAppState((prevAppState: AppState) => ({
                ...prevAppState,
                associations: prevAppState.associations.map((walkerAssociation: AssociationInspection) =>
                    (walkerAssociation.selectableAssociation.association == singleAssociationInspection.selectableAssociation.association) ?
                        {
                            ...walkerAssociation,
                            isAssociationSelected: !singleAssociationInspection.isAssociationSelected
                        } : walkerAssociation)
            }));
        };

        return (
            <div key={validAssociationID} className={"d-flex justify-content-around"}>
                <input onChange={handleChangeOnSelect} type={"checkbox"} checked={singleAssociationInspection.isAssociationSelected} />
                <p className={"m-0"}>{singleAssociationInspection.selectableAssociation.association}</p>
            </div>
        );
    });

    return (
        <div className="col-12">
            <h1>State-Analyse</h1>
            <div className="row">
                <div className="col-3">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="associationDropDown" data-toggle="dropdown">
                            Select Associations
                        </button>
                        <div className="dropdown-menu">
                            {dropdownAssociationSelectionMenu}
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    {appState.artifactTree != null ? <ArtefactTree /> : ""}
                </div>
                <div id={"artifactGraph"} className="col-12">
                    <ArtifactGraphChart />
                </div>
            </div>
        </div>
    );
}