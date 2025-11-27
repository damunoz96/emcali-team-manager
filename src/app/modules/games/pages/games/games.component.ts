import { Component, computed, inject } from '@angular/core';
import { injectInfiniteQuery, injectQuery } from '@tanstack/angular-query-experimental';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { GameCardComponent } from '../../components/game-card.component';
import { CardComponent } from '../../../../shared/components/card.component';
import { GameService } from '../../services/games.service';
import { QUERY_KEYS } from '../../../../core/constants/query-keys';
import { AddGameModalComponent } from "../../components/add-game-modal/add-game-modal.component";

@Component({
  selector: 'app-games-page',
  templateUrl: './games.component.html',
  imports: [
    GameCardComponent,
    CardComponent,
    InfiniteScrollDirective,
    AddGameModalComponent
],
})
export class GamesComponent {
  private readonly gameService = inject(GameService);

  readonly games = injectInfiniteQuery(() => ({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: ({ pageParam }) => this.gameService.getGames({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < 10) return undefined;
      return lastPageParam + 1
    },
    select: (data) => data.pages.flat(),
  }));

  readonly stats = injectQuery(() => ({
    queryKey: ['games', 'total-wins'],
    queryFn: () => this.gameService.getStats(),
  }));

  readonly completedGames = computed(() => {
    const games = this.games.data();
    if (!games) return [];
    return games.filter((g) => g.status === 'completed');
  });

  readonly upcomingGames = computed(() => {
    const games = this.games.data();
    if (!games) return [];
    return games.filter((g) => g.status === 'upcoming');
  });

  readonly totalLosses = computed(() => {
    return this.completedGames().filter((g) => g.score && g.score < g.opponent_score).length;
  });

  readonly totalPoints = computed(() => {
    return this.completedGames().reduce((acc, g) => acc + (g.score || 0), 0);
  });

  readonly avgPoints = computed(() => {
    if (this.completedGames().length <= 0) return 0;
    return (this.totalPoints() / this.completedGames().length);
  });
}
