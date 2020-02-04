import { Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'  
import { Subject } from 'rxjs';

export class ShoppingListService {

    newIngredient = new Subject<Ingredient>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient('Tomatoes', 4)
      ];

    constructor() {        
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
    }

    getIngredients(){
        return this.ingredients.slice()
    }
}