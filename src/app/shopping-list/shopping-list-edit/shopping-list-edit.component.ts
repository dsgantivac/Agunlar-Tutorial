import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService} from './../shopping-list.service'
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',{static: true}) slForm: NgForm;

  ingredient:Ingredient;
  subscription: Subscription
  editItemIndex: number = null;
  editMode:boolean = false

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true
      this.ingredient =  this.shoppingListService.getIngredientById(index)
      this.editItemIndex = index;
      this.slForm.setValue({name: this.ingredient.name, amount: this.ingredient.amount})  
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onSubmit(shoppingForm : NgForm){
    if(!this.editMode){
      this.shoppingListService.newIngredient.next(new Ingredient(shoppingForm.value.name, shoppingForm.value.amount));
    }else{
      let values = this.slForm.value
      let updatedIngredient = new Ingredient(values.name,values.amount);
      this.shoppingListService.editIngredient(this.editItemIndex, updatedIngredient);
    }
    this.editMode = false
    this.slForm.reset()
    this.editItemIndex = null
  }
  
  resetForm(){
    this.editMode = false
    this.slForm.reset()
    this.editItemIndex = null
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex)
    this.resetForm()
    this.editItemIndex = null
  }
}
