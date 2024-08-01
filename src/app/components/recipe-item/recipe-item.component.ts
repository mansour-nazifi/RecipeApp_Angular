import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { HoverHighlightDirective } from '../../directives/hover-highlight.directive';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [HoverHighlightDirective],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {     
    @Input() recipe:Recipe;   
    @Input() btnTitle:string;

    @Output() whenButtonClick = new EventEmitter();     

    btnClick(recipe: Recipe): void {
      this.whenButtonClick.emit(recipe);       
    }
}
