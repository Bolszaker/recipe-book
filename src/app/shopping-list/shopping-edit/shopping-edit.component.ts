import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/ingredient.model';
import { NgForm } from '@angular/forms';

import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {   
    this.subscription = this.shoppingService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItems(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.resetForm();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.slForm.resetForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
