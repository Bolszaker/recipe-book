import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) =>{
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
