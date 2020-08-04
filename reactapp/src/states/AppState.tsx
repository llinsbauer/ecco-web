import * as React from "react";
import { useState } from "react";
import { createContainer } from "react-tracked";
import { ReducedArtifactPlugin } from "../Domain/Model/Backend/ReducedArtifactPlugin";
import { FeatureModel } from "../Domain/Model/Backend/FeatureModel";
import { AssociationInspection } from "../Domain/Model/Frontend/AssociationInspection";
import { ArtefactTreeModel } from "../Domain/Model/Backend/ArtefactTreeModel";

export interface AppState {
    directory: string,
    repoOperation: string,
    plugins: ReducedArtifactPlugin[]
    artifactTree: ArtefactTreeModel,
    features: FeatureModel[],
    associations: AssociationInspection[],
    eccoServiceIsInitialized: boolean,
    currentFeature: FeatureModel
}

const useValue = () => useState<AppState>({
    directory: "",
    repoOperation: "",
    artifactTree: null,
    features: [],
    associations: [],
    plugins: [],
    eccoServiceIsInitialized: false,
    currentFeature: {
        description: null,
        name: null
    }
});

export const {
    Provider: SharedStateProvider,
    useTracked: useSharedState
} = createContainer(useValue);
