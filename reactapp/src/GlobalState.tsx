import * as React from "react";
import { useState } from "react";
import { createContainer } from "react-tracked";

export type GlobalState = {
    repositoryIsInitialized?: boolean,
    repositoryDirectory?: string
}

const useValue = () => useState<GlobalState>({
    repositoryDirectory: "meiner leeres Repo",
    repositoryIsInitialized: false
});
export const { Provider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);