import {ApiData} from "../ApiData";
import {NumberRevisionsPerFeature} from "./NumberRevisionsPerFeature";

export interface RevisionsPerFeatureResponse extends ApiData {
    data: NumberRevisionsPerFeature[];
}