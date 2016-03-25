import {Component} from 'angular2/core';

import {StatusComponent} from './status.component';
import {FeaturesComponent} from './features.component';
import {CommitsComponent} from './commits.component';
import {AssociationsComponent} from './associations.component';
import {ArtifactsGraphComponent} from './artifacts.graph.component';

import {AppComponent} from './app.component';

@Component({
    selector: 'ecco-app',
    directives: [StatusComponent, FeaturesComponent, CommitsComponent, AssociationsComponent, ArtifactsGraphComponent, AppComponent],
    template: `
    
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">ECCO</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#status" aria-controls="status" data-toggle="tab">Status</a></li>
                    <li><a href="#features" aria-controls="features" data-toggle="tab">Features</a></li>
                    <li><a href="#commits" aria-controls="commits" data-toggle="tab">Commits</a></li>
                    <li><a href="#associations" aria-controls="associations" data-toggle="tab">Associations</a></li>
                    <li><a href="#artifactsgraph" aria-controls="artifactsgraph" data-toggle="tab">Artifacts Graph</a></li>
                    
                    <li><a href="#testapp" aria-controls="testapp" data-toggle="tab">Test</a></li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
            
        </div><!-- /.container-fluid -->
    </nav>

    <div class="container">

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="status"><status-comp></status-comp></div>
            <div role="tabpanel" class="tab-pane" id="features"><features-comp></features-comp></div>
            <div role="tabpanel" class="tab-pane" id="commits"><commits-comp></commits-comp></div>
            <div role="tabpanel" class="tab-pane" id="associations"><associations-comp></associations-comp></div>
            <div role="tabpanel" class="tab-pane" id="artifactsgraph"><artifacts-graph-comp></artifacts-graph-comp></div>
            
            <div role="tabpanel" class="tab-pane" id="testapp"><test-app></test-app></div>
        </div>
        
    </div>
    `
})
export class EccoComponent { }
