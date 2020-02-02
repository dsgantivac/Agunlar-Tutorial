import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  @Output('DataOut') viewSelected = new EventEmitter<string>();  
  view = "Recipes"

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(){    
  }

  changeView(view){
    this.view = view;
    this.viewSelected.emit(view)
  }

}
