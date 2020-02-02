import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  constructor(private recipeService: RecipeService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      let recipeId = params["id"]
      this.recipe = this.recipeService.getRecipeById(recipeId)  
      //this.recipe = this.recipeService.getRecipes()[recipeId]  
    })
  }

  onAddIngredientsToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe["ingredients"])
  }


  

}
