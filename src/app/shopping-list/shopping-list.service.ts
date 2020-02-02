import { Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'  

export class ShoppingListService {

    @Output() newIngredient = new EventEmitter<Ingredient>();

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