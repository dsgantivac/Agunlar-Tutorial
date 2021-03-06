import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private url = 'https://angulartesting-d31e0.firebaseio.com/recipes.json'

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.url, recipes).subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.url).pipe(
            map(recipes => {
                recipes.forEach(recipe => {
                    if (!recipe.ingredients) {
                        recipe.ingredients = []
                    }
                });
                return recipes
            }), tap(recipes => {
                this.recipeService.setRecipes(recipes)
            }))
        /*.subscribe(recipes => {
            console.log(recipes);
        })
        */
    }

}