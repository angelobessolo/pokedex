import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeService } from '../../services/poke.service';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  standalone: true,
  imports: [CommonModule, PokemonAbilitiesComponent, TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonDetailComponent implements OnInit {
  pokemon = signal<any>(null);
  @Input() flgView: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokeService: PokeService
  ) {
    const name = this.route.snapshot.paramMap.get('name');
    effect(() => {
      console.log(`El mensaje ha cambiado a: ${name}`);
    });
  
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      // const name = this.route.snapshot.paramMap.get('name');
      if (!name) return;
      this.pokeService.getPokemonDetails(name).subscribe({
        next: (data) => {
          console.log('Pokemon data:', data);
          (this.pokemon.set(data))
        },
        error: (err) => console.error('Failed to load Pokémon details', err),
      });
    });

    // const name = this.route.snapshot.paramMap.get('name');
    // if (!name) return;
    // this.pokeService.getPokemonDetails(name).subscribe({
    //   next: (data) => {
    //     console.log('Pokemon data:', data);
    //     (this.pokemon.set(data))
    //   },
    //   error: (err) => console.error('Failed to load Pokémon details', err),
    // });
  }

  addFavorite(): void {
    this.pokeService.saveFavorite(this.pokemon());
  }

  viewPokemon(name: string): void {
    this.router.navigateByUrl(`view/${name}`);
  }
}
