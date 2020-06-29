import * as React from "react";
import { useState } from "react";
import { createContainer } from "react-tracked";
import { ReducedArtifactPlugin } from "../Domain/Model/ReducedArtifactPlugin";
import { FeatureModel } from "../Domain/Model/FeatureModel";
import { ArtifactModel } from "../Domain/Model/ArtifactModel";

//repoOperation wird nur ein String sein, der beim Bestätigen der jeweligen Button mit dem richtigen String befüllt wird
//Und bei einer State-Änderung wird die dementsprechende Operation des States mit Hilfe eines Calls an die API gesendet...
//TODO: siehe oben
export interface AppState {
    directory: string,
    repoOperation: string,
    plugins: ReducedArtifactPlugin[]
    artifacts: ArtifactModel[],
    features: FeatureModel[],
    eccoServiceIsInitialized: boolean,
    currentFeature: FeatureModel
}

const useValue = () => useState<AppState>({
    directory: "",
    repoOperation: "",
    //Wird nur von der Artifacts-Component bedient
    artifacts: [

    ],
    //Wird nur von der Features-Component bedient
    features: [

    ],
    plugins: [

    ],
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