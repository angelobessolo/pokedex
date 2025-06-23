import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonList, Result } from '../interfaces/pokemon-list.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  http = inject(HttpClient);

  getPokemonList(offset = 0, limit = 20): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.apiUrl + '?offset=' + offset + '&limit=' + limit);
  }

  getPokemonDetails(name: string): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + '/' + name);
  }

  saveFavorite(pokemon: any): void {
    let favs = localStorage.getItem('favorites');
    let favorites = JSON.parse(favs || '[]');
    const pokemonExist = favorites.find((pokemonFav: any) => pokemonFav.name === pokemon.name);

    if (!pokemonExist){
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      Swal.fire({
        title: "Favorites Pokemon!",
        html: "A pokemon was added to your favorite list successfully!!.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
         
        }
      });
    }else {
      Swal.fire({
        title: "Favorites Pokemon!",
        html: "This Pokémon is already in your favorites!.",
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
