import { ApiData } from "./ApiData";
import { FeatureVersionModel } from "./FeatureVersionModel";

export interface FeatureVersionResponse extends ApiData {
    data: FeatureVersionModel[]
}