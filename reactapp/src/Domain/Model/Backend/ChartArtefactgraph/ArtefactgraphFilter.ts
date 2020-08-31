export class ArtefactgraphFilter {
    public maxChildCount: number;
    public nodeID: string;

    constructor(maxChildCount?: number, nodeID?: string) {
        this.maxChildCount = maxChildCount;
        this.nodeID = nodeID;
    }
}
