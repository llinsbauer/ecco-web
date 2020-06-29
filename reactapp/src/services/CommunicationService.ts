import { OperationContainer } from "../Domain/Model/OperationContainer";
import { RequestConfig } from "../Domain/Model/RequestConfig";
import { FeatureModel } from "../Domain/Model/FeatureModel";

const axios = require("axios");

export class CommunicationService {

    private static readonly BASE_URI = "http://localhost:8080/rest/api";
    private static readonly FEATURE_ENDPOINT = "/features";
    private static readonly ARTIFACT_ENDPOINT = "/artifacts";
    private static readonly REPOSITORY_ENDPOINT = "/repository";
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

    public updateFeatureInBackend(updatedFeatureModel: FeatureModel): Promise<any> {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
        };
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.FEATURE_ENDPOINT}`,
            JSON.stringify(updatedFeatureModel),
            config
        )
    }

    public getFeatures(): Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.FEATURE_ENDPOINT}`
        );
    }

    public doOpenCloseRepositoryWithDirectory(baseDirectory: string, openCloseRepositoryOperation: string) : Promise<any> {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
        };
        let operationContainer = new OperationContainer();
        operationContainer.repositoryOperation = openCloseRepositoryOperation;
        operationContainer.repositoryDirectory = baseDirectory + CommunicationService.ECCO_DIRECTORY
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`,
            JSON.stringify(operationContainer),
            config
        );
    }

    public corsTest() : Promise<any> {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
            'crossdomain': true
        };

        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}/corstest`,
            config
        )
    }

    public closeRepositoryWithDirectory() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.REPOSITORY_ENDPOINT}`
        );
    }
}