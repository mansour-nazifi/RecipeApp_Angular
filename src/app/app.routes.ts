import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';

export const routes: Routes = [
    {
         path:'',
         component:RecipeListComponent
    },
    {
        path:'my-recipes',
        component:MyRecipesComponent
    }
];
