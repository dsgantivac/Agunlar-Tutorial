import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService} from './../shopping-list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @Output() ingredient = new EventEmitter<Ingredient>();
  name:string = null;
  amount:number = null;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    this.shoppingListService.newIngredient.next(new Ingredient(this.name,this.amount));
  }

}
