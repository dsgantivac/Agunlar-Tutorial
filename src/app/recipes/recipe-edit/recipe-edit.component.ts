import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe
  id: number
  editMode = false
  recipeFormGroup: FormGroup

  constructor(private route: ActivatedRoute, private routes : Router,private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"]
      this.recipe = this.recipeService.getRecipeById(this.id)  
      this.editMode = Object.keys(this.recipe).length > 0;
    })

    let recipeName = this.editMode ? this.recipe.name : null ;
    let recipeDescription = this.editMode ? this.recipe.description : null ;
    let recipeImagePath = this.editMode ? this.recipe.imagePath : null ;
    let recipeIngredients = new FormArray([]) ;
    
    if(this.editMode && this.recipe.ingredients){
      for(let ingredient of this.recipe.ingredients){
        recipeIngredients.push(
          new FormGroup({
            "name": new FormControl(ingredient.name,Validators.required),
            "amount": new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          )
        }
      }
    
    this.recipeFormGroup = new FormGroup({
      "name": new FormControl(recipeName,Validators.required),
      "description": new FormControl(recipeDescription,Validators.required),
      "imagePath": new FormControl(recipeImagePath,Validators.required),
      "ingredients": recipeIngredients
    })
  }
  onSubmit(){
    let values = this.recipeFormGroup.value
    const recipe = new Recipe(values.name, values.description,values.imagePath, values.ingredients)
    if(this.editMode){
      this.recipeService.editRecipe(this.id, recipe); 
    }else{
      this.recipeService.addRecipe(recipe)
    }

  }

  
  onCancel(){
    this.recipeFormGroup.reset()
    this.routes.navigate(["recipes",'new'])
  }
  
  addIngredient(){
    const control = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeFormGroup.get('ingredients')).push(control);
  }
  
  deleteIngredient(id){
    (<FormArray>this.recipeFormGroup.get('ingredients')).removeAt(id)
  }

}
