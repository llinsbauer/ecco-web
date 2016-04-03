import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
    selector: 'toggle-button',
    inputs: ['isDisabled', 'label'],
    outputs: ['onToggle'],
    directives: [NgClass],
    template: `
        <button type="button" class="btn btn-primary" 
            [ngClass]="{active: isOn, disabled: isDisabled}"
            (click)="toggle()">
                {{label}}
        </button> 
         `
})
export class ToggleButton {
    label: string;
    onToggle = new EventEmitter<boolean>();
  
    isOn = false;
    isDisabled = false;
    toggle() {
        if (!this.isDisabled) {
            this.isOn = !this.isOn;
            this.onToggle.emit(this.isOn);
        }
    }
}
