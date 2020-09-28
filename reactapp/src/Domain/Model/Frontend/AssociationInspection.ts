import { AssociationModel } from "../Backend/AssociationModel";

export class AssociationInspection {

    public isAssociationSelected: boolean;
    public selectableAssociation: AssociationModel;

    constructor(selectableAssociation: AssociationModel) {
        this.isAssociationSelected = false;
        this.selectableAssociation = selectableAssociation;
    }
}