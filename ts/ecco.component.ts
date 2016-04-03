import {Component} from 'angular2/core';
import {Router, RouteConfig, RouteParams, RouteData, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {SettingsService} from './settings.service';

import {StatusComponent} from './status.component';
import {FeaturesComponent} from './features.component';
import {CommitsComponent} from './commits.component';
import {AssociationsComponent} from './associations.component';
import {ArtifactsGraphComponent} from './artifacts.graph.component';

import {TestComponent} from './test.component';




@Component({
    selector: 'features-route-comp',
    directives: [FeaturesComponent],
    template: `<features-comp [repo]="settingsService.repo"></features-comp>`
})
class FeaturesRouteComponent {
    settingsService: SettingsService;
    repo: string;
    constructor(settingsService: SettingsService, params: RouteParams) {
        this.settingsService = settingsService;

        if (params.get('repo'))
            this.repo = params.get('repo');
    }
}







@Component({
    selector: 'ecco-main',
    inputs: ['repo'],
    directives: [ROUTER_DIRECTIVES],
    template: `
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">
        
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation-bar" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="">ECCO</a>
            </div>
            
            <div class="collapse navbar-collapse" id="navigation-bar">
                <div class="nav navbar-nav">
                    <!--<li [class.active]="isActive(['Status'])"><a [routerLink]="['Status']">Status</a></li>-->
                    <li [class.active]="statusLink.classList.contains('router-link-active')"><a [routerLink]="['Status']" #statusLink>Status</a></li>
                    <!--<li [class.active]="isActive(['Features',{repo: repo}])"><a [routerLink]="['Features',{repo:repo}]">Features</a></li>-->
                    <li [class.active]="isActive(['Features'])"><a [routerLink]="['Features']">Features</a></li>
                    <li [class.active]="isActive(['Commits'])"><a [routerLink]="['Commits']">Commits</a></li>
                    <li [class.active]="isActive(['Associations'])"><a [routerLink]="['Associations']">Associations</a></li>
                    <li [class.active]="isActive(['ArtifactsGraph',{repo:settingsService.repo}])"><a [routerLink]="['ArtifactsGraph',{repo:settingsService.repo}]">Artifacts Graph</a></li>
                    
                    <li [class.active]="isActive(['Test'])"><a [routerLink]="['Test']">Test</a></li>
                </div>
            </div>
           
        </div>
    </nav>

    <!-- Tabs -->
    <div class="tab-content">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/status', name: 'Status', component: StatusComponent, useAsDefault: true },
    { path: '/features', name: 'Features', component: FeaturesRouteComponent },
    { path: '/commits', name: 'Commits', component: CommitsComponent },
    { path: '/associations', name: 'Associations', component: AssociationsComponent },
    { path: '/artifactsgraph', name: 'ArtifactsGraph', component: ArtifactsGraphComponent },
    { path: '/test', name: 'Test', component: TestComponent }
])
export class EccoComponent {
    settingsService: SettingsService;

    router: Router;

    constructor(settingsService: SettingsService, router: Router, params: RouteParams) {
        this.settingsService = settingsService;

        if (params.get('repo')) {
            this.settingsService.repo = params.get('repo');
            //alert("Repository URL set to : " + params.get("repo"));
        }

        this.router = router;
    }

    isActive(instruction: any[]): boolean {
        return this.router.isRouteActive(this.router.generate(instruction));
    }
}





@Component({
    selector: 'main-router',
    directives: [ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})
@RouteConfig([
    { path: '/ecco/...', name: 'Ecco', component: EccoComponent, useAsDefault: true }
])
export class MainRouterComponent {
    constructor(router: Router) {
    }
}
