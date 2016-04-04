System.register(['angular2/platform/browser', 'angular2/http', 'angular2/router', './ecco.component', './settings.service', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, router_1, ecco_component_1, settings_service_1, core_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ecco_component_1_1) {
                ecco_component_1 = ecco_component_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(ecco_component_1.MainRouterComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, settings_service_1.SettingsService]);
        }
    }
});
//bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
//# sourceMappingURL=main.js.map