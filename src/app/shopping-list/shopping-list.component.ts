import { Component, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private newIngredientSubs: Subscription
  private changeSubs: Subscription


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    
    //update ingredients if new ingredient is created
    this.ingredients = this.shoppingListService.getIngredients()
    this.newIngredientSubs = this.shoppingListService.newIngredient.subscribe((ingredient: Ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
      this.ingredients = this.shoppingListService.getIngredients()
    })
    
    //edit ingredients if change is made
    this.changeSubs = this.shoppingListService.editChange.subscribe(change => {
      this.ingredients = this.shoppingListService.getIngredients()
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.newIngredientSubs.unsubscribe()
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}
