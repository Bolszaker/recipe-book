import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "src/shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'Test pizza 1',
    //       'Just test recipe',
    //       'https://www.odzywianie.info.pl/img/stories/arts/_665x/pizza-historia-rodzaje.jpg',
    //       [
    //         new Ingredient('ser', 1),
    //         new Ingredient('sos', 2)
    //       ]),
    //     new Recipe(
    //       'Test pizza 2',
    //       'Just another test',
    //       'https://pizzeriasangiovanni.pl/wp-content/uploads/2019/08/p1-1030x579.jpg',
    //       [
    //         new Ingredient('ciasto', 3),
    //         new Ingredient('szynka', 4)
    //       ]
    //     ),
    //   ];

    recipes: Recipe[] = [];
    
    constructor(private shoppingService: ShoppingService){}

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
       return this.recipes.slice();
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shoppingService.addRecipeIngredients(ingredients);
    }
    
    loadRecipe(index: number){
      return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}