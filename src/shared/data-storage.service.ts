import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

import { RecipeService } from "src/app/recipes/recipes.service";
import { Recipe } from "src/app/recipes/recipe.model";

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-76f2a-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response =>{
            console.log(response);
        });
    }

    fetchRecipes(){
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-76f2a-default-rtdb.firebaseio.com/recipes.json').pipe(
                map(recipes =>{
                    return recipes.map(recipe =>{
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
            }),
                tap(recipes =>{
                    this.recipeService.setRecipes(recipes);    
                }));
    }
}