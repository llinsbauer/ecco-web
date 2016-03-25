import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';




interface Feature {
    name: String;
    description: String;
}





@Component({
    selector: 'test-app',
    viewProviders: [HTTP_PROVIDERS],
    //template: '<span>{{raw}}</span>'
    template: `
    <ul>
        <li *ngFor="#item of features; #i = index">
            {{i}} {{item != null ? item.name : 'null'}} {{item != null ? item.description : 'null'}}
        </li>
    </ul>
    <div class="list-group">
        <a href="#" class="list-group-item" *ngFor="#item of features; #i = index">
            <h4 class="list-group-item-heading">{{item != null ? item.name : 'null'}}</h4>
            <p class="list-group-item-text">{{item != null ? item.description : 'null'}}</p>
        </a>
    </div>
    
    
    

    <nav class="navbar navbar-inverse">
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
    
    
    
    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading">Features</div>
        
        
        
        
    <nav class="navbar navbar-inverse navbar-static-top">
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

        
        
        
        <div class="panel-body">
            <p>List of all features.</p>
        </div>

          <!-- Table -->
        <table class="table">
            <tr><th>#</th><th>Name</th><th>Description</th></tr>
            <tr *ngFor="#item of features; #i = index"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>
        </table>
    </div>
    
    <div class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
            <span class="sr-only">45% Complete</span>
        </div>
    </div>
    
    
    
    <div id="testgraph"></div>
    
    
    `
})
export class AppComponent {
    public features: Feature[];
    public raw: String;
    constructor(http: Http) {
        ////this.raw = http.get('localhost:8080/myapp/features/all');
        //http.get('http://localhost:8080/myapp/features/all')
        //.map(res => res.json())
        //.subscribe(features => { this.features = features; this.raw = this.features[0].name; } , err => alert(err), () => console.log('done'));




 


    }
}
