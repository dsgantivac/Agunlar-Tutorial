import { Component, OnInit, DoCheck} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],

})
export class RecipeListComponent implements OnInit, DoCheck {
  
  recipes: Recipe[] = null


  constructor(private recipeService: RecipeService, private routes: Router, private route: ActivatedRoute) { 
  }
  
  ngOnInit() {
  }
  
  ngDoCheck() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    console.log("new recipe");
    this.routes.navigate(['/recipes','new'])
  }

}
