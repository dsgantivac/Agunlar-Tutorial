import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  constructor(private recipeService: RecipeService, private activateRoute: ActivatedRoute, private routes: Router) { }
  id: number

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params["id"]
      this.recipe = this.recipeService.getRecipeById(this.id)  
      //this.recipe = this.recipeService.getRecipes()[recipeId]  
    })
  }

  onAddIngredientsToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe["ingredients"])
  }

  onDelete(){
    console.log(this.id);
    this.recipeService.deleteRecipe(this.id)
    this.routes.navigate(["recipes",'new'])
  }


  

}
