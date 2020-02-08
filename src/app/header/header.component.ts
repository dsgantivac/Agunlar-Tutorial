import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('DataOut') viewSelected = new EventEmitter<string>();  
  view = "Recipes"

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){
    this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
