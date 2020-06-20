import * as React from "react";

export interface FeatureProps {}

export class Feature extends React.Component<FeatureProps, {}> {


    render() {
        return (
            <div className="col-12">
                <p>Feature-Component works...</p>
            </div>
        );
    }
}