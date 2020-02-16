import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '',  redirectTo: "/recipes", pathMatch: "full"},
  {path: 'recipes',  loadChildren: './recipes/recipes.module#RecipesModule' }, // IMPORTANT (remove RecipesModule from app module) for lazy loading
  {path: 'auth',  loadChildren: './auth/auth.module#AuthModule' }, // IMPORTANT (remove RecipesModule from app module)
  {path: 'shopping-list',  loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' } // IMPORTANT (remove RecipesModule from app module)
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // PreloadAllModules load all components in background
  exports: [RouterModule]
})
export class AppRoutingModule { }
