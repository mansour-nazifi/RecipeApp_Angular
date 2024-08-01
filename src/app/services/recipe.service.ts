import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'assets/recipes.json';
  private savedRecipes: Recipe[] = [];
  private savedRecipesSubject = new BehaviorSubject<Recipe[]>([]);
  savedRecipes$ = this.savedRecipesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  isAdded(recipe: Recipe):boolean{
   return this.savedRecipes.includes(recipe);
  }

  saveRecipe(recipe: Recipe): void {
    if(this.isAdded(recipe))
      return;

    this.savedRecipes.push(recipe);
    this.savedRecipesSubject.next(this.savedRecipes);
  }

  removeRecipe(recipe: Recipe): void {
    this.savedRecipes = this.savedRecipes.filter(r => r.id !== recipe.id);
    this.savedRecipesSubject.next(this.savedRecipes);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
