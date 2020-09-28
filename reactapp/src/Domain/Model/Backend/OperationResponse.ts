import {ApiData} from "./ApiData";
import {ReducedArtifactPlugin} from "./ReducedArtifactPlugin";

export interface OperationResponse extends ApiData {
    data: {
        eccoServiceIsInitialized: boolean
        artifactPlugins: ReducedArtifactPlugin[]
    }
}