import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

import {SettingsService} from './settings.service';

interface Feature {
    name: string;
    description: string;
}

@Component({
    selector: 'features-comp',
    inputs: ['repo'],
    viewProviders: [HTTP_PROVIDERS],
    template: `
    <nav class="navbar-fixed-bottom navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <form class="navbar-form navbar-left">
                <button type="button" class="btn btn-primary" (click)="refresh()" [disabled]="refreshing" [ngClass]="{disabled: refreshing}">Refresh</button>
                <span class="label label-default">{{repo}}</span>
                <!--<span class="label label-default">{{settingsService.repo}}</span>-->
            </form>
            
            <!--
            <form class="navbar-form navbar-right">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for Features">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">Go!</button>
                    </span>
                </div>
            </form>
            --> 
      
        </div>
    </nav>

    <div class="alert alert-danger" role="alert" *ngIf="errorMessage">
        <span class="glyphicon glyphicon-exclamation-sign"></span>
        <span class="sr-only">Error:</span> <span >{{errorMessage}}</span>
    </div>

    <div class="progress" *ngIf="refreshing">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%">
            <span class="sr-only"></span>
        </div>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <!--<div class="panel-heading">Features</div>-->
            
            <div class="panel-body">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for Features">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">Go!</button>
                    </span>
                </div>
            </div>

            <!-- Table -->
            <table class="table">
                <tr><th>#</th><th>Name</th><th>Description</th></tr>
                <tr *ngFor="#item of features; #i = index"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>
            </table>
        </div>
    </div>
    
    <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for Feature Version">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">Go!</button>
                    </span>
                </div>
            </div>

            <table class="table">
                <tr><th>#</th><th>Version</th><th>Description</th></tr>
                
            </table>
        </div>
    </div>
    `
})
export class FeaturesComponent {
    features: Feature[];
    raw: String;

    http: Http;

    repo: string = 'repo/';
    refreshing: boolean = false;
    error: any;
    errorMessage: string;

    constructor(http: Http) {
        this.http = http;
    }

    refresh() {
        if (!this.refreshing) {
            this.refreshing = true;
            //this.http.get(this.settingsService.repo + "features/all.json")
            this.http.get(this.repo + "feature")
                .map(res => res.json())
                .subscribe(
                features => {
                    this.features = features;
                    this.raw = this.features[0].name;
                    this.refreshing = false;
                },
                error => {
                    this.error = <any>error;
                    this.refreshing = false;
                    this.errorMessage = error.status + ' ' + error.url + ', ' + this.repo + 'feature';
                    console.error('error: ' + this.errorMessage);
                    //console.error('error: ' + error.status + ' ' + error.statusText + ' ' + error.headers + ' ' + error.type + ' ' + error.url);
                    //console.log(Object.keys(error));
                },
                () => console.log('done: get all features'));
        }
    }

}
