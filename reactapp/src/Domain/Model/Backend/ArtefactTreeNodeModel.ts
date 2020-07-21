export interface ArtefactTreeNodeModel {
    childNodes: ArtefactTreeNodeModel[];
    ordered: boolean;
    atomic: boolean;
    unique: boolean;
    sequenceNumber: string;
    correspondingAssociation: string;
    artefactData: string;
}