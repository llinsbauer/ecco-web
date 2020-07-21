import { ApiData } from "./ApiData";
import {AssociationModel} from "./AssociationModel";

export interface AssociationResponse extends ApiData {
    data: AssociationModel[]
}