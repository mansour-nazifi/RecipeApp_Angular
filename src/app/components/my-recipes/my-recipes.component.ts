import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';

@Component({
  standalone:true,
  imports:[RecipeItemComponent],
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {
  savedRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.savedRecipes$.subscribe(recipes => {
      this.savedRecipes = recipes;
    });
  }

  removeRecipe(recipe: Recipe): void {
    this.recipeService.removeRecipe(recipe);
  }
}
