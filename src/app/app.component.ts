import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  currentView = "Recipes";


  onNavigate(Data: string){
    this.currentView = Data;    
  }


}
