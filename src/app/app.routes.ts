import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: '', 
    loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent),
    children: [
      { 
        path: 'pokemons', 
        loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent)

      },
      { path: 'pokemon/:name', 
        loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
      }
    ]
  },
  { 
    path: 'pokemons', 
    loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent)
  },
  { 
    path: ':name', 
    loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
  },
  { path: 'view/:name', 
    loadComponent: () => import('./components/view-layout/view-layout.component').then(m => m.ViewLayoutComponent),
  },
  {
    path: '', redirectTo: '/pokemons', pathMatch: 'full'
  }
];
