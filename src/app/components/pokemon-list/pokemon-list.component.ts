import { Component, OnInit, signal } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonList, Result } from '../../interfaces/pokemon-list.interface';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    RouterLink
  ],
  standalone: true,
})
export class PokemonListComponent implements OnInit {
  public pokemonList = signal<Result[]>([]);
  public offsetResults = signal<number>(0);
  public limitResults = signal<number>(20);
  searchQuery = '';
  favoritePokemons = signal<Pokemon[]>([]);

  constructor(protected pokeService: PokeService) {
    setInterval(() => {
      this.favoritePokemons.set(this.getFavs());
    }, 200); // Cada segundo
  }

  ngOnInit(): void {
    this.loadPokemon();
  }

  protected getRouterLink(name: string): string {
    return `/pokemon/${name}`;
  }

  public loadPokemon(): void {
    this.pokeService.getPokemonList(this.offsetResults(), this.limitResults()).subscribe({
      next: (data: PokemonList) => {
        this.pokemonList.set([...this.pokemonList(), ...data.results]);
      },
      error: (err) => console.error('Failed to load Pokémon', err),
    });
  }

  public getMorePokemon(): void {
    const offtet = this.pokemonList().length;
    this.offsetResults.set(offtet);
    this.pokeService.getPokemonList(this.offsetResults(), this.limitResults()).subscribe({
      next: (data) => {
        this.pokemonList.set([...this.pokemonList(), ...data.results]);
      },
      error: (err) => console.error('Failed to load Pokémon', err),
    });
  }

  public getFavs() {
    const favs = localStorage.getItem('favorites');
    if (!favs) return [];
    return JSON.parse(favs);
  }

  searchPokemon(): void {
    if (this.searchQuery.trim()) {
      this.pokeService
        .getPokemonDetails(this.searchQuery.toLowerCase())
        .subscribe({
          next: (pokemon: Result) => {
            this.pokemonList.set([pokemon]);
          },
          error: (err) => {
            console.error('Failed to search Pokémon', err)
          }
        });
    } else {
      this.loadPokemon();
    }
  }

  public removeFavorite(pokemon: any): void {
    let favs = localStorage.getItem('favorites');
    let favorites = JSON.parse(favs || '[]');
    const index = favorites.findIndex((pokemonFav: any) => pokemonFav.name === pokemon);

    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.favoritePokemons.set(favorites);
      Swal.fire({
        title: "Favorites Pokemon!",
        html: "Pokemon removed from favorites!.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          
        }
      });
    } else {
      alert('Pokemon not found in favorites!');
      Swal.fire({
        title: "Favorites Pokemon!",
        html: "Pokemon wasn't found in favorites!.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          
        }
      });
    }
  }
}
