import { ApiData } from "./ApiData";
import {ArtefactTreeModel} from "./ArtefactTreeModel";

export interface ArtefactResponse extends ApiData {
    data: ArtefactTreeModel
}