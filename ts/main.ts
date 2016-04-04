import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS} from 'angular2/router';

import {provide} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {MainRouterComponent, EccoComponent} from './ecco.component';
import {SettingsService} from './settings.service';

import {enableProdMode} from 'angular2/core';
enableProdMode();

bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService]);
//bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
