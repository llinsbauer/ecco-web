import { ApiData } from "../ApiData";
import { NumberArtifactsPerDepth } from "./NumberArtifactsPerDepth";

export interface ArtifactsPerDepthResponse extends ApiData {
    data: NumberArtifactsPerDepth[]
}