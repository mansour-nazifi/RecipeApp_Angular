import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  savedRecipeCount: number = 0;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.savedRecipes$.subscribe(items => {
      this.savedRecipeCount = items.length;
    });
  }
}
