import {Component} from 'angular2/core';

@Component({
    selector: 'features-comp',
    template: `

    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading">Features</div>
        
        <div class="panel-body">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for Features">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button">Go!</button>
                </span>
            </div>
        </div>

          <!-- Table -->
        <table class="table">
            <tr><th>#</th><th>Name</th><th>Description</th></tr>
            <tr *ngFor="#item of features; #i = index"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>
        </table>
    </div>
    
    `
})
export class FeaturesComponent { }
