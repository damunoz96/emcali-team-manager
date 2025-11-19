import { Routes } from '@angular/router';

export const GAME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/games/game-detail/game-detail.component').then(m => m.GameDetailComponent)
  },
]
