import { Component, computed, inject } from '@angular/core';
import { GameCardComponent } from '../../components/game-card.component';
import { CardComponent } from "../../../../shared/components/card.component";
import { GameService } from '../../services/games.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Game } from '../../models/games.model';

@Component({
  selector: 'app-games-page',
  templateUrl: './games.component.html',
  imports: [GameCardComponent, CardComponent],
})
export class GamesComponent {
  private readonly gameService = inject(GameService);

  readonly games = injectQuery(() => ({
    queryKey: ['games'],
    queryFn: () => this.gameService.getGames(),
  }));

  readonly totalWins = injectQuery(() => ({
    queryKey: ['games', 'total-wins'],
    queryFn: () => this.gameService.getTotalWins(),
    select: (data: Game[]) => data.length,
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

  cardsData = [
    { title: 'Total Games', content: this.completedGames().length },
    { title: 'Total Wins', content: this.totalWins.data() },
    { title: 'Total Losses', content: this.totalLosses() },
    { title: 'Average Points per Game', content: this.avgPoints() },
  ];
}
