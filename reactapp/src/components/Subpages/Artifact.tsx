import * as React from "react";

export interface ArtifactProps {}

export class Artifact extends React.Component<ArtifactProps, {}> {
    render() {
        return (
            <div className="col-12">
                <p>Artifact-Component works...</p>
            </div>
        );
    }
}