import {constants} from "http2";

const axios = require("axios");

export class CommunicationService {

    private static readonly BASE_URI = "http://localhost:8080/rest/api";
    private static readonly FEATURE_ENDPOINT = "/features";
    private static readonly ARTIFACT_ENDPOINT = "/artifacts";
    private static readonly REPOSITORY_ENDPOINT = "/";

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
        let fullRepoDirectory = repoDirectory + "/.ecco";
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`,
            {
                repositoryDirectory: fullRepoDirectory
            }
        );
    }

}