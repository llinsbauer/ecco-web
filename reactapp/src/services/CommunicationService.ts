import {constants} from "http2";
import {ApplicationInitialization} from "../Domain/Model/ApplicationInitialization";
import {RequestConfig} from "../Domain/Model/RequestConfig";

const axios = require("axios");

export class CommunicationService {

    private static readonly BASE_URI = "http://localhost:8080/rest/api";
    private static readonly FEATURE_ENDPOINT = "/features";
    private static readonly ARTIFACT_ENDPOINT = "/artifacts";
    private static readonly REPOSITORY_ENDPOINT = "/";
    private static readonly ECCO_DIRECTORY = "/.ecco";

    private static communicationServiceInstance: CommunicationService;

    private constructor() {

    }

    public static getInstance() {
        if (!this.communicationServiceInstance) {
            this.communicationServiceInstance = new CommunicationService();
        }
        return this.communicationServiceInstance;
    }

    public initializeRepoWithDirectory(repoDirectory: string): Promise<any> {
        let config = new RequestConfig();
        config.headers = { 'Content-Type': 'application/json' };
        let applicationContainer = new ApplicationInitialization();
        applicationContainer.repositoryDirectory = repoDirectory + CommunicationService.ECCO_DIRECTORY;;
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`,
            JSON.stringify(applicationContainer),
            config
        );
    }

    public openRepository() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`
        );
    }

    public closeRepository() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`
        );
    }

}