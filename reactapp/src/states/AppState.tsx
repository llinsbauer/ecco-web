import * as React from "react";
import { useState } from "react";
import { createContainer } from "react-tracked";
import { ReducedArtifactPlugin } from "../Domain/Model/Backend/ReducedArtifactPlugin";
import { FeatureModel } from "../Domain/Model/Backend/FeatureModel";
import { AssociationInspection } from "../Domain/Model/Frontend/AssociationInspection";
import { ArtefactTreeModel } from "../Domain/Model/Backend/ArtefactTreeModel";

//repoOperation wird nur ein String sein, der beim Bestätigen der jeweligen Button mit dem richtigen String befüllt wird
//Und bei einer State-Änderung wird die dementsprechende Operation des States mit Hilfe eines Calls an die API gesendet...
//TODO: siehe oben
export interface AppState {
    directory: string,
    repoOperation: string,
    plugins: ReducedArtifactPlugin[]
    artifactTree: ArtefactTreeModel,
    features: FeatureModel[],
    associations: AssociationInspection[],
    eccoServiceIsInitialized: boolean,
    //Das hier eventuell wegnehmen, das kannst du dir am Wochenende anschauen...
    ///Eventuell wirklich in dem Appstate nur alle Listen speichern...
    currentFeature: FeatureModel
}

const useValue = () => useState<AppState>({
    directory: "",
    repoOperation: "",
    //Wird nur von der Artifacts-Component bedient
    artifactTree: null,
    //Wird nur von der Features-Component bedient
    features: [

    ],
    associations: [

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