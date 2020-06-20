import * as React from "react";
import { Approuter } from "./Approuter";
import { CommunicationService } from "../services/CommunicationService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export interface HelloProps {}

export interface AppState {
    repositoryIsInitialized: boolean,
    repositoryDirectory: string
}
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<HelloProps, AppState> {

    public state: AppState;

    private communicationService: CommunicationService;

    constructor(properties: HelloProps) {
        super(properties);
        this.state = {
            repositoryIsInitialized: false,
            repositoryDirectory: "/home/marc/TestRepoForEcco/Repo2"
        }
        this.communicationService = CommunicationService.getInstance();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOnInput = this.handleChangeOnInput.bind(this);
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.communicationService.initializeRepoWithDirectory(this.state.repositoryDirectory).then((response: Response) => {
            //Request war erfolgreich, Repo ist initialisiert...
            if (response.status < 300) {
                this.setState({
                    repositoryIsInitialized: true
                });
            } else {
                this.setState({
                    repositoryIsInitialized: false
                });
            }
        }).catch((error: any) => {
            this.setState({repositoryIsInitialized: false});
        }).finally(() => {
            //UI kann wieder freigegeben werden...
            //TODO: State-Handling mit Bootstrap so hinbekommen, dass bei einem Request die UI nicht angeklickt werden kann
            console.log("Request beendet...");
        });
    }

    public handleChangeOnInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({repositoryDirectory: event.target.value});
        console.log(event);
    }

    render() {
        let repositoryDirectory = this.state.repositoryDirectory;
        let repositoryIsInitialized = this.state.repositoryIsInitialized;
        return (
            <div className={"row"}>
                <Approuter />
                <div className="col-6">
                    <p className={"m-0"}>Repository muss erst initialisiert werden, damit die Features und die Artifacts abgerufen werden können.</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="repoDirectory">Dateipfad</label>
                            <input value={repositoryDirectory} onChange={this.handleChangeOnInput} id={"repoDirectory"} className={"form-control"} type={"text"} placeholder={"Dateipfad zu .ecco-Ordner..."}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-6">
                    <p>Repo-Directory ist: {repositoryDirectory}</p>
                    <p>Repo-Directory ist initialisiert: {String(repositoryIsInitialized)}</p>
                </div>
            </div>
        );
    }
}