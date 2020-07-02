import * as React from "react";
import {useEffect} from "react";
import {CommunicationService} from "../../services/CommunicationService";
import {AssociationResponse} from "../../Domain/Model/AssociationResponse";
import {AppState, useSharedState} from "../../states/AppState";
import {AssociationModel} from "../../Domain/Model/AssociationModel";

export const Association: React.FC = () => {

    const [appState, setAppState] = useSharedState();

    useEffect(() => {
        CommunicationService.getInstance().getAssociations().then((associationResponse: AssociationResponse) => {
            setAppState((previousState: AppState) => ({
                ...previousState,
                associations: associationResponse.data
            }));
        });
    }, []);

    const associations = appState.associations.map((association: AssociationModel) => {

        let validHTMLID = "validid" + association.association;

        return (
            <div key={validHTMLID} className="card">
                <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-center collapsed" type="button"
                                data-toggle="collapse" data-target={"#" + validHTMLID}>
                            {association.associationID}
                        </button>
                    </h2>
                </div>
                <div id={validHTMLID} className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                        Yet another Informationaccordion to show some Information about the associations...
                        <div className="row">
                            <div className="col-12">
                                <p>AssocationID</p>
                                <p>{association.association}</p>
                            </div>
                            <div className="col-12">
                                <p>simpleModuleCondition</p>
                                <p>{association.simpleModuleCondition}</p>
                            </div>
                            <div className="col-12">
                                <p>simpleModuleRevisionCondition</p>
                                <p>{association.simpleModuleRevisionCondition}</p>
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
        </div>
    );
};