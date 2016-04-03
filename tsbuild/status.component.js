System.register(['angular2/core', './settings.service'], function(exports_1, context_1) {
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
    var core_1, settings_service_1;
    var StatusComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            StatusComponent = (function () {
                function StatusComponent(settingsService) {
                    this.settingsService = settingsService;
                    this.repositoryUrl = this.settingsService.repo;
                }
                StatusComponent.prototype.onSubmit = function () {
                    this.settingsService.repo = this.repositoryUrl;
                };
                StatusComponent = __decorate([
                    core_1.Component({
                        selector: 'status-comp',
                        template: "\n    <div class=\"container\">\n        <div class=\"panel panel-default\">\n            <!-- Default panel contents -->\n            <div class=\"panel-heading\">Settings</div>\n            \n            <div class=\"panel-body\">\n                <form (ngSubmit)=\"onSubmit()\" #settingsForm=\"ngForm\">\n                    <div class=\"input-group\">\n                        <input [(ngModel)]=\"repositoryUrl\" ngControl=\"repositoryUrlInput\" #repositoryUrlInput=\"ngForm\" required type=\"text\" class=\"form-control\" placeholder=\"Repository URL\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"repositoryUrl == settingsService.repo\">Set</button>\n                        </span>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService])
                ], StatusComponent);
                return StatusComponent;
            }());
            exports_1("StatusComponent", StatusComponent);
        }
    }
});
//# sourceMappingURL=status.component.js.map