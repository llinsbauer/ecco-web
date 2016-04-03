import {Component} from 'angular2/core';

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
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit" [disabled]="repositoryUrl == settingsService.repo">Set</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
})
export class StatusComponent {
    settingsService: SettingsService;

    repositoryUrl: string;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;

        this.repositoryUrl = this.settingsService.repo;
    }

    onSubmit() {
        this.settingsService.repo = this.repositoryUrl;
    }
}
