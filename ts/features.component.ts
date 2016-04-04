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
                <button type="button" class="btn btn-primary" (click)="refresh()" [ngClass]="{disabled: refresing}">Refresh</button>
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
    //settingsService: SettingsService;

    http: Http;

    features: Feature[];
    raw: String;

    repo: string = 'repo/';

    refresing: boolean = false;

    //constructor(settingsService: SettingsService, http: Http) {
    constructor(http: Http) {
        //this.settingsService = settingsService;
        this.http = http;
    }

    refresh() {
        this.refresing = true;
        //this.http.get(this.settingsService.repo + "features/all.json")
        this.http.get(this.repo + "/features/all.json")
            .map(res => res.json())
            .subscribe(features => { this.features = features; this.raw = this.features[0].name; this.refresing = false; }, err => alert(err), () => console.log('done: get all features'));

    }

}
