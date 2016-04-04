System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var FeaturesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            FeaturesComponent = (function () {
                //constructor(settingsService: SettingsService, http: Http) {
                function FeaturesComponent(http) {
                    this.repo = 'repo/';
                    this.refresing = false;
                    //this.settingsService = settingsService;
                    this.http = http;
                }
                FeaturesComponent.prototype.refresh = function () {
                    var _this = this;
                    this.refresing = true;
                    //this.http.get(this.settingsService.repo + "features/all.json")
                    this.http.get(this.repo + "/features/all.json")
                        .map(function (res) { return res.json(); })
                        .subscribe(function (features) { _this.features = features; _this.raw = _this.features[0].name; _this.refresing = false; }, function (err) { return alert(err); }, function () { return console.log('done: get all features'); });
                };
                FeaturesComponent = __decorate([
                    core_1.Component({
                        selector: 'features-comp',
                        inputs: ['repo'],
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        template: "\n    <nav class=\"navbar-fixed-bottom navbar navbar-default\" role=\"navigation\">\n        <div class=\"container-fluid\">\n            <form class=\"navbar-form navbar-left\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"refresh()\" [ngClass]=\"{disabled: refresing}\">Refresh</button>\n                <span class=\"label label-default\">{{repo}}</span>\n                <!--<span class=\"label label-default\">{{settingsService.repo}}</span>-->\n            </form>\n            \n            <!--\n            <form class=\"navbar-form navbar-right\">\n                <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search for Features\">\n                    <span class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" type=\"button\">Go!</button>\n                    </span>\n                </div>\n            </form>\n            --> \n      \n        </div>\n    </nav>\n\n    <div class=\"col-lg-6 col-md-6 col-sm-6\">\n        <div class=\"panel panel-default\">\n            <!-- Default panel contents -->\n            <!--<div class=\"panel-heading\">Features</div>-->\n            \n            <div class=\"panel-body\">\n                <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search for Features\">\n                    <span class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" type=\"button\">Go!</button>\n                    </span>\n                </div>\n            </div>\n\n            <!-- Table -->\n            <table class=\"table\">\n                <tr><th>#</th><th>Name</th><th>Description</th></tr>\n                <tr *ngFor=\"#item of features; #i = index\"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>\n            </table>\n        </div>\n    </div>\n    \n    <div class=\"col-lg-6 col-md-6 col-sm-6\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n                <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search for Feature Version\">\n                    <span class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" type=\"button\">Go!</button>\n                    </span>\n                </div>\n            </div>\n\n            <table class=\"table\">\n                <tr><th>#</th><th>Version</th><th>Description</th></tr>\n                \n            </table>\n        </div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], FeaturesComponent);
                return FeaturesComponent;
            }());
            exports_1("FeaturesComponent", FeaturesComponent);
        }
    }
});
//# sourceMappingURL=features.component.js.map