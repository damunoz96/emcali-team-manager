import { Routes } from '@angular/router';

export const GAME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)
  },
  {
    path: 'add-game',
    loadComponent: () => import('./pages/add-game/add-game.component').then(m => m.AddGameComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/game-detail/game-detail.component').then(m => m.GameDetailComponent)
  },
]
