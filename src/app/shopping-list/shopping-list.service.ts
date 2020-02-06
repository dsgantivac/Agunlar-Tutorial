import { Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'  
import { Subject } from 'rxjs';

export class ShoppingListService {
    newIngredient = new Subject<Ingredient>();
    editChange = new Subject<boolean>();
    startedEditing = new Subject<number>();
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

    getIngredientById(id){
        return Object.assign({},this.ingredients[id]) 
    }

    editIngredient(id, ingredient){
        this.ingredients[id] = ingredient;
        this.editChange.next(true)
    }

    deleteIngredient(id){
        console.log(this.ingredients);
        
        this.ingredients.splice(id,1)
        console.log(this.ingredients);
        this.editChange.next(true)
    }
    
}