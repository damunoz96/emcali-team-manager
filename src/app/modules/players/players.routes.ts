import { Routes } from '@angular/router';

export const PLAYERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/players.component').then(m => m.PlayersComponent)
  }
]
