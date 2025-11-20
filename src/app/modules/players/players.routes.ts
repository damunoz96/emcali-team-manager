import { Routes } from '@angular/router';

export const PLAYERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/players/players.component').then(m => m.PlayersComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/player-detail/player-detail.component').then(m => m.PlayerDetailComponent)
  }
]
