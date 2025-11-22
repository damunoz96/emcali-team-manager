import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
          path: '',
          loadChildren: () => import('./modules/home/home.routes').then(m => m.HOME_ROUTES)
        },
        {
          path: 'players',
          loadChildren: () => import('./modules/players/players.routes').then(m => m.PLAYERS_ROUTES)
        },
        {
          path: 'games',
          loadChildren: () => import('./modules/games/games.routes').then(m => m.GAME_ROUTES)
        },
        {
          path: 'auth',
          loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
        }

]
  }];
