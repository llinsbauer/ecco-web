import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService {
    _repo: string = "repo/";

    constructor() {

    }

    get repo(): string {
        return this._repo;
    }

    set repo(repo: string) {
        this._repo = repo;
    }
}
