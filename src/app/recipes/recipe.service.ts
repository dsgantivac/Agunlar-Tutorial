import { Recipe } from './recipe.model'
import { EventEmitter, Output, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {

    @Output() recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("A test recipe",
            "This is a simpy test",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsq-p5Z7lLcWwrqstXDrTUjPCzA3Fai2t3Lzz8SnyNzANBI6Yexw&s",
            [new Ingredient("Meat",1), new Ingredient("Bread",2) ]),
        new Recipe("A test recipe 2",
            "This is a simpy second test",
            "https://images-gmi-pmc.edge-generalmills.com/a0f37125-bb72-4910-9d48-772555de6224.jpg",
            [new Ingredient("Cheese",4), new Ingredient("Eggs",8) ])
    ]

    constructor(private SLService: ShoppingListService) {

    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
    }

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipeById(id){
        return this.recipes.slice()[id]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        ingredients.forEach(ingredient => {
            this.SLService.addIngredient(ingredient)
        })
    }



}