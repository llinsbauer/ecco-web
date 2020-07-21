import * as React from "react";
import { useSharedState } from "../../states/AppState";
import { ArtefactTreeNodeModel } from "../../Domain/Model/Backend/ArtefactTreeNodeModel";
import { v4 as uuidv4 } from 'uuid';

export const ArtefactTree : React.FC = () => {

    const [appState, setAppState] = useSharedState();
    let usedUUIDs: string[] = [];

    const generateNewUUID = () => {
        let newUUID = uuidv4();
        if (usedUUIDs.length == 0) {
            usedUUIDs.push(newUUID);
        } else {
            while (usedUUIDs.some((oldUUID: string) => {
                return oldUUID == newUUID;
            })) {
                newUUID = uuidv4();
            }
            usedUUIDs.push(newUUID);
        }
        return newUUID;
    }

    const createUniqueBagde = (givenNode: ArtefactTreeNodeModel) => {
        return ((givenNode.unique == true) ? <span className="badge badge-success">isUnique</span> : <span className="badge badge-danger">isNotUnique</span>);
    }

    const createOrderedBagde = (givenNode: ArtefactTreeNodeModel) => {
        console.log("givenNode is Ordered", givenNode.ordered);
        return ((givenNode.ordered == true) ? <span className="badge badge-success">isOrdered</span> : <span className="badge badge-danger">isNotOrdered</span>);
    }

    const createAtomicBagde = (givenNode: ArtefactTreeNodeModel) => {
        console.log("givenNode is atomic", givenNode.atomic);
        return ((givenNode.atomic == true) ? <span className="badge badge-success">isAtomic</span> : <span className="badge badge-danger">isNotAtomic</span>);
    }

    const artefactTreeNestedDropdowns = appState.artifactTree.rootNode.childNodes.map((treeNode: ArtefactTreeNodeModel) => {

        const traverseTreeForNestedDropdowns = (givenNode: ArtefactTreeNodeModel) => {

            //IDs in einem HTML-Attribut dürfen mit keiner Zahl beginnen, deswegen ein String davor, damit dieser Fall ausgeschlossen wird
            let newUUID = "validHTMLId" + generateNewUUID();

            const showNestedSubDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                let targetNestedDropdown = document.getElementById(event.currentTarget.getAttribute("data-nesteddropdowntarget"));
                let iconElement = event.currentTarget.querySelector(".nested-dropdown-toggler-icon");
                iconElement.classList.toggle("rotate-90");
                targetNestedDropdown.classList.toggle("show");
            }

            let atomic = createAtomicBagde(givenNode);
            let unique = createUniqueBagde(givenNode);
            let ordered = createOrderedBagde(givenNode);

            return (
                <div key={newUUID} className="nested-subdropdown">
                    <div data-nesteddropdowntarget={newUUID} onClick={showNestedSubDropdown} className="nested-dropdown-toggler">
                        {givenNode.childNodes.length > 0 ? <i className={"fas fa-angle-right nested-dropdown-toggler-icon"}></i> : <span className="nested-dropdown-toggler-spacer"></span>}
                        <div className={"nested-dropdown-toggler-wrapper"}>
                            <p className={"nested-dropdown-toggler-content"}>{givenNode.artefactData}</p>
                            {atomic}
                            {unique}
                            {ordered}
                        </div>
                    </div>
                    <div id={newUUID} className="nested-dropdown-container">
                        {givenNode.childNodes.map((givenChildNode: ArtefactTreeNodeModel) => {
                            return traverseTreeForNestedDropdowns(givenChildNode);
                        })}
                    </div>
                </div>
            );
        }

        return traverseTreeForNestedDropdowns(treeNode);
    });

    let rootUUID = generateNewUUID();

    const showSubDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let targetNestedDropdown = document.getElementById(event.currentTarget.getAttribute("data-nesteddropdowntarget"));
        targetNestedDropdown.classList.toggle("show");
        let iconElement = event.currentTarget.querySelector(".nested-dropdown-toggler-icon");
        iconElement.classList.toggle("rotate-90");
    }

    return (
        <div className="row">
            <div className={"col-12"} id="d3treeStructure">
                {appState.artifactTree.rootNode ?
                    <div className="nested-dropdown">
                        <div data-nesteddropdowntarget={rootUUID} onClick={showSubDropdown} className="nested-dropdown-toggler">
                            {appState.artifactTree.rootNode.childNodes.length > 0 ? <i className={"fas fa-angle-right nested-dropdown-toggler-icon"}></i> : <span className="nested-dropdown-toggler-spacer"></span>}
                            <p className={"nested-dropdown-toggler-content"}>{appState.artifactTree.rootNode.artefactData}</p>
                        </div>
                        <div id={rootUUID} className="nested-dropdown-container">
                            {appState.artifactTree.rootNode.childNodes.length > 0 ? artefactTreeNestedDropdowns : ""}
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    );

};