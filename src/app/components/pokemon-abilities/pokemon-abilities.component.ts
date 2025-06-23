import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Stat } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-abilities',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './pokemon-abilities.component.html',
  styleUrl: './pokemon-abilities.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonAbilitiesComponent {
  @Input() abilities: Stat[] = [];
}
