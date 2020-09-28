import {ApiData} from "../ApiData";

export interface NumberOfArtifactsResponse extends ApiData{
    data: AssociationArtifactsModel[];
}