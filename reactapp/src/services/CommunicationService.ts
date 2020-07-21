import { OperationContainer } from "../Domain/Model/Frontend/OperationContainer";
import { RequestConfig } from "../Domain/Model/Backend/RequestConfig";
import { FeatureModel } from "../Domain/Model/Backend/FeatureModel";
import {FeatureVersionModel} from "../Domain/Model/Backend/FeatureVersionModel";
import {AssociationModel} from "../Domain/Model/Backend/AssociationModel";
import {AssociationInspection} from "../Domain/Model/Frontend/AssociationInspection";

const axios = require("axios");

export class CommunicationService {

    private static readonly BASE_URI = "http://localhost:8080/rest/api";
    private static readonly FEATURE_ENDPOINT = "/features";
    private static readonly ARTIFACT_ENDPOINT = "/artefacts";
    private static readonly REPOSITORY_ENDPOINT = "/repository";
    private static readonly ASSOCIATIONS_ENDPOINT = "/associations";
    private static readonly NUMBER_OF_ARTIFACTS_PER_ASSOCIATION = "/numberofartifacts";
    private static readonly NUMBER_OF_ARTIFACTS_PER_DEPTH = "/artifactsperdepth";
    private static readonly NUMBER_OF_REVISIONS_PER_FEATURE = "/numberofrevisions";
    private static readonly NUMBER_OF_MODULES_PER_ORDER = "/modulesperorder";
    private static readonly ECCO_DIRECTORY = "/.ecco";

    private static communicationServiceInstance: CommunicationService;

    private constructor() {

    }

    public getArtifactgraph() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.ARTIFACT_ENDPOINT}`
        )
    }

    public getNumberOfModules() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.ASSOCIATIONS_ENDPOINT + CommunicationService.NUMBER_OF_MODULES_PER_ORDER}`
        )
    }

    public getNumberOfRevisionsPerFeature() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.FEATURE_ENDPOINT + CommunicationService.NUMBER_OF_REVISIONS_PER_FEATURE}`
        )
    }

    public getNumberOfArtifactsPerDepth() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.ASSOCIATIONS_ENDPOINT + CommunicationService.NUMBER_OF_ARTIFACTS_PER_DEPTH}`
        )
    }

    public getNumberOfArtifactsPerAssociation() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.ASSOCIATIONS_ENDPOINT + CommunicationService.NUMBER_OF_ARTIFACTS_PER_ASSOCIATION}`
        )
    }

    public static getInstance() {
        if (!this.communicationServiceInstance) {
            this.communicationServiceInstance = new CommunicationService();
        }
        return this.communicationServiceInstance;
    }

    public getAssociations() : Promise<any> {
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.ASSOCIATIONS_ENDPOINT}`,
        )
    }

    public updateFeatureversionFromFeature(currentFeatureModel: FeatureModel, updatedFeatureVersionModel: FeatureVersionModel) : Promise<any>  {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
        };
        currentFeatureModel.name
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.FEATURE_ENDPOINT}/${currentFeatureModel.name}/version`,
            JSON.stringify(updatedFeatureVersionModel),
            config
        )
    }

    public getFeatureversionsFromFeature(currentFeatureModel: FeatureModel) : Promise<any> {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
        };
        return axios.get(
            `${CommunicationService.BASE_URI + CommunicationService.FEATURE_ENDPOINT}/${currentFeatureModel.name}/version`,
            config
        )
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

    public getArtifactsByAssociation(association: AssociationModel[]) : Promise<any> {
        let config = new RequestConfig();
        config.headers = {
            'Content-Type': 'application/json',
        };
        return axios.post(
            `${CommunicationService.BASE_URI + CommunicationService.ARTIFACT_ENDPOINT}`,
            JSON.stringify(association),
            config
        )
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