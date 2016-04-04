System.register(['angular2/core', 'angular2/router', './settings.service', './status.component', './features.component', './commits.component', './associations.component', './artifacts.graph.component', './test.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, settings_service_1, status_component_1, features_component_1, commits_component_1, associations_component_1, artifacts_graph_component_1, test_component_1;
    var FeaturesRouteComponent, EccoComponent, MainRouterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (status_component_1_1) {
                status_component_1 = status_component_1_1;
            },
            function (features_component_1_1) {
                features_component_1 = features_component_1_1;
            },
            function (commits_component_1_1) {
                commits_component_1 = commits_component_1_1;
            },
            function (associations_component_1_1) {
                associations_component_1 = associations_component_1_1;
            },
            function (artifacts_graph_component_1_1) {
                artifacts_graph_component_1 = artifacts_graph_component_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            }],
        execute: function() {
            FeaturesRouteComponent = (function () {
                function FeaturesRouteComponent(settingsService, params) {
                    this.settingsService = settingsService;
                    if (params.get('repo'))
                        this.repo = params.get('repo');
                }
                FeaturesRouteComponent = __decorate([
                    core_1.Component({
                        selector: 'features-route-comp',
                        directives: [features_component_1.FeaturesComponent],
                        template: "<features-comp [repo]=\"settingsService.repo\"></features-comp>"
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, router_1.RouteParams])
                ], FeaturesRouteComponent);
                return FeaturesRouteComponent;
            }());
            EccoComponent = (function () {
                function EccoComponent(settingsService, router, params) {
                    this.settingsService = settingsService;
                    if (params.get('repo')) {
                        this.settingsService.repo = decodeURIComponent(params.get('repo'));
                    }
                    else {
                        this.settingsService.repo = 'repo/';
                    }
                    this.router = router;
                }
                EccoComponent.prototype.isActive = function (instruction) {
                    return this.router.isRouteActive(this.router.generate(instruction));
                };
                EccoComponent.prototype.encodedRepo = function () {
                    return encodeURIComponent(this.settingsService.repo);
                };
                EccoComponent = __decorate([
                    core_1.Component({
                        selector: 'ecco-main',
                        inputs: ['repo'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n    <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n        <div class=\"container-fluid\">\n        \n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navigation-bar\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <!--<a class=\"navbar-brand\" href=\"\">ECCO</a>-->\n                <a class=\"navbar-brand\" [routerLink]=\"['Ecco',{repo:encodedRepo()}]\">ECCO</a>\n                <!--<a class=\"navbar-brand\" href=\"ecco/?repo={{settingsService.repo}}\">ECCO</a>-->\n            </div>\n            \n            <div class=\"collapse navbar-collapse\" id=\"navigation-bar\">\n                <div class=\"nav navbar-nav\">\n                    <!--<li [class.active]=\"isActive(['Status'])\"><a [routerLink]=\"['Status']\">Status</a></li>-->\n                    <li [class.active]=\"statusLink.classList.contains('router-link-active')\"><a [routerLink]=\"['Status']\" #statusLink>Status</a></li>\n                    \n                    <!--<li [class.active]=\"isActive(['Features',{repo:settingsService.repo}])\"><a [routerLink]=\"['Features',{repo:settingsService.repo}]\">Features</a></li>-->\n                    <li [class.active]=\"isActive(['Features'])\"><a [routerLink]=\"['Features']\">Features</a></li>\n                    \n                    <li [class.active]=\"isActive(['Commits'])\"><a [routerLink]=\"['Commits']\">Commits</a></li>\n                    <li [class.active]=\"isActive(['Associations'])\"><a [routerLink]=\"['Associations']\">Associations</a></li>\n                    <!--<li [class.active]=\"isActive(['ArtifactsGraph',{repo:settingsService.repo}])\"><a [routerLink]=\"['ArtifactsGraph',{repo:settingsService.repo}]\">Artifacts Graph</a></li>-->\n                    <li [class.active]=\"isActive(['ArtifactsGraph'])\"><a [routerLink]=\"['ArtifactsGraph']\">Artifacts Graph</a></li>\n                    \n                    <li [class.active]=\"isActive(['Test'])\"><a [routerLink]=\"['Test']\">Test</a></li>\n                </div>\n            </div>\n           \n        </div>\n    </nav>\n\n    <!-- Tabs -->\n    <div class=\"tab-content\">\n        <router-outlet></router-outlet>\n    </div>\n    "
                    }),
                    router_1.RouteConfig([
                        { path: '/status', name: 'Status', component: status_component_1.StatusComponent, useAsDefault: true },
                        { path: '/features', name: 'Features', component: FeaturesRouteComponent },
                        { path: '/commits', name: 'Commits', component: commits_component_1.CommitsComponent },
                        { path: '/associations', name: 'Associations', component: associations_component_1.AssociationsComponent },
                        { path: '/artifactsgraph', name: 'ArtifactsGraph', component: artifacts_graph_component_1.ArtifactsGraphComponent },
                        { path: '/test', name: 'Test', component: test_component_1.TestComponent }
                    ]), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, router_1.Router, router_1.RouteParams])
                ], EccoComponent);
                return EccoComponent;
            }());
            exports_1("EccoComponent", EccoComponent);
            MainRouterComponent = (function () {
                function MainRouterComponent(router) {
                }
                MainRouterComponent = __decorate([
                    core_1.Component({
                        selector: 'main-router',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "<router-outlet></router-outlet>"
                    }),
                    router_1.RouteConfig([
                        { path: '/ecco/...', name: 'Ecco', component: EccoComponent, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], MainRouterComponent);
                return MainRouterComponent;
            }());
            exports_1("MainRouterComponent", MainRouterComponent);
        }
    }
});
//# sourceMappingURL=ecco.component.js.map