import { Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],

})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[] = null
  recipeSubscription: Subscription


  constructor(private recipeService: RecipeService, private routes: Router, private route: ActivatedRoute) { 
  }
  
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    
    this.recipeSubscription  = this.recipeService.recipeChange.subscribe(data => {
      this.recipes = this.recipeService.getRecipes();
    })
  }
  
  ngOnDestroy(){
    this.recipeSubscription.unsubscribe()
  }

  onNewRecipe(){
    console.log("new recipe");
    this.routes.navigate(['/recipes','new'])
  }

}
