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
        if (this._repo != repo) {
            this._repo = repo;

            //window.history.pushState("repo: " + repo, "repo: " + repo, location.pathname + "?repo=" + repo);
        }
    }
}
