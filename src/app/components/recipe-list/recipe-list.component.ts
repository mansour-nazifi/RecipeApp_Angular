import { Component, OnInit } from '@angular/core'; 
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from "../recipe-item/recipe-item.component";
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
 
 
@Component({
  standalone:true,
  imports: [CommonModule, RecipeItemComponent,ReactiveFormsModule],
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes$: Observable<Recipe[]>=new Observable<Recipe[]>();    

  searchForm = new FormGroup({
    searchControl: new FormControl('')     
  });

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    
    this.recipeService.getRecipes().subscribe(recipes => {       
      this.recipes = recipes;
      this.filteredRecipes$ = this.searchForm.controls["searchControl"].valueChanges.pipe(
        startWith(''),
        map(value => this.filterRecipes(value??""))
      );
    });
  }

  private filterRecipes(value: string): Recipe[] {
    
    const filterValue = value.toLowerCase();
    return this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(filterValue) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(filterValue))
    );
  }

  saveRecipe(recipe: Recipe): void {
    this.recipeService.saveRecipe(recipe);
  }
}