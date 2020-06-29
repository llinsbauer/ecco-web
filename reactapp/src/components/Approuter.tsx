import * as React from "react";
import {
    Router,
    Link,
    Switch,
    Route
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Feature } from "./Subpages/Feature";
import { Artifact } from "./Subpages/Artifact";
import { Home } from "./Home";
import { useSharedState } from "../states/AppState";

const history = createBrowserHistory();

export const Approuter : React.FC = () => {

    const [appState, setAppState] = useSharedState();

    let disabledCSSClass = "disabled";

    return (
        <Router history={history}>
            <nav className="col-12 navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">EccoHub</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link " + (!appState.eccoServiceIsInitialized ? disabledCSSClass : "")} to="/features">Features</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className={"nav-link " + (!appState.eccoServiceIsInitialized ? disabledCSSClass : "")} to="/artifacts">Artifacts</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/features">
                    <Feature />
                </Route>
                <Route path="/artifacts">
                    <Artifact />
                </Route>
            </Switch>
        </Router>
    );
}