import * as React from "react";

export interface HomeProps {}

export class Home extends React.Component<HomeProps, {}> {

    render() {
        return (
            <div className="col-12">
                <p>Home-Component works...</p>
            </div>
        );
    }
}