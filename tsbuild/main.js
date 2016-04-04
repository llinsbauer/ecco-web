System.register(['angular2/platform/browser', 'angular2/http', 'angular2/router', 'angular2/core', './ecco.component', './settings.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, router_1, core_1, router_2, ecco_component_1, settings_service_1, core_2;
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
                router_2 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (ecco_component_1_1) {
                ecco_component_1 = ecco_component_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            //bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService]);
            browser_1.bootstrap(ecco_component_1.MainRouterComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, settings_service_1.SettingsService, core_1.provide(router_2.LocationStrategy, { useClass: router_2.HashLocationStrategy })]);
        }
    }
});
//# sourceMappingURL=main.js.map