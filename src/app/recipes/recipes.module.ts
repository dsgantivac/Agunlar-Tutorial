import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from '../shorten.pipe';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    // componentes declared in routers has to be declared inside of the module that use this components
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        ShortenPipe // custom pipe
    ],
    imports: [
        //CommonModule, // use instead of BrowserModule
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ],
    providers: [

    ],
    /* Can comment this because all components are loaded inside of the routing module
    exports: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]
      */
})
export class RecipesModule{

}