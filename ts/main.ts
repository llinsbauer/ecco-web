import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

import {provide} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {MainRouterComponent, EccoComponent, DEFAULT_REPO_URL} from './ecco.component';
import {SettingsService} from './settings.service';

import {enableProdMode} from 'angular2/core';
enableProdMode();


bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService, provide(DEFAULT_REPO_URL, { useValue: 'repo/' })]);
//bootstrap(MainRouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SettingsService, provide(DEFAULT_REPO_URL, { useValue: 'repo/' }), provide(LocationStrategy, { useClass: HashLocationStrategy })]);
