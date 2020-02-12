import { Directive, ViewContainerRef } from '@angular/core';


//it has to be added to app.modules
@Directive({
     selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef){}
}