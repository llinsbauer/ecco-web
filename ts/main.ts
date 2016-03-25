import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http'
import {EccoComponent} from './ecco.component';
import {enableProdMode} from 'angular2/core';

enableProdMode();
bootstrap(EccoComponent, [HTTP_PROVIDERS]);
