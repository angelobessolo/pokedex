import { Component } from '@angular/core';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-view-layout',
  standalone: true,
  imports: [
    PokemonDetailComponent,
    RouterLink
  ],
  templateUrl: './view-layout.component.html',
  styleUrl: './view-layout.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewLayoutComponent {

}
