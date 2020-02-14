import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],

    imports: [
        FormsModule,
        RouterModule.forChild([{path: "shopping-list", component: ShoppingListComponent}]),
        SharedModule
    ],

    exports: [
        ShoppingListComponent,
        ShoppingListEditComponent,
        RouterModule
    ]
})
export class ShoppingListModule {

}