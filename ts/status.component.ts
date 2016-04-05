import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {SettingsService} from './settings.service';

@Component({
    selector: 'status-comp',
    template: `
    <div class="container">
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Settings</div>
            
            <div class="panel-body">
                <form (ngSubmit)="onSubmit()" #settingsForm="ngForm">
                    <div class="input-group">
                        <input [(ngModel)]="repositoryUrl" ngControl="repositoryUrlInput" #repositoryUrlInput="ngForm" required type="text" class="form-control" placeholder="Repository URL">
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit" [disabled]="repositoryUrl == settingsService.repo">&nbsp;<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
})
export class StatusComponent {
    settingsService: SettingsService;

    router: Router;

    repositoryUrl: string;

    constructor(router: Router, settingsService: SettingsService) {
        this.settingsService = settingsService;

        this.router = router;

        this.repositoryUrl = this.settingsService.repo;
    }

    onSubmit() {
        this.settingsService.repo = this.repositoryUrl;

        //location.search = "repo=" + encodeURIComponent(this.settingsService.repo);
        this.router.parent.navigate(['/ECCO', { repo: encodeURIComponent(this.settingsService.repo) }]);
    }
}
