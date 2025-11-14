import { Routes } from '@angular/router';

export const GAME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)
  },
]
