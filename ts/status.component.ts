import {Component} from 'angular2/core';

@Component({
    selector: 'status-comp',
    template: `
    STATUS
    
    <span class="glyphicon glyphicon-grain" aria-hidden="true"></span>

    <span class="label label-default">Default</span><span class="label label-primary">Primary</span>

    <div class="input-group">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
        <span class="input-group-addon" id="basic-addon2">@example.com</span>
    </div>
    `
})
export class StatusComponent { }
