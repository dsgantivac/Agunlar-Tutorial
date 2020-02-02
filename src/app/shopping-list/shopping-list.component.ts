import { Component, OnInit, DoCheck } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, DoCheck {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.newIngredient.subscribe((ingredient: Ingredient) => {
      console.log(ingredient);
      this.shoppingListService.addIngredient(ingredient);
    })
  }

  ngDoCheck() {
    this.ingredients = this.shoppingListService.getIngredients()
  }


}
