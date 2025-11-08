import { Routes } from '@angular/router';
import { PlayersPage } from './pages/players-page';

export const PLAYERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/players-page').then(m => m.PlayersPage)
  }
]
