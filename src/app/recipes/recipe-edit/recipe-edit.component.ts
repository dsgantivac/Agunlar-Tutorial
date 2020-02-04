import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe
  id: number
  editMode = false

  constructor(private route: ActivatedRoute, private routes : Router,private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"]
      this.recipe = this.recipeService.getRecipeById(this.id)  
      this.editMode = Object.keys(this.recipe).length > 0;
    }) 
  }

  editRecipe(){
    this.recipeService.editRecipe(this.id, this.recipe);
    this.routes.navigate(["new"], {relativeTo: this.route})
  }

}
