import { Component, computed, inject } from '@angular/core';
import { Game, GameCardComponent } from '../../components/game-card.component';
import { CardComponent } from "../../../../shared/components/card.component";
import { GameService } from '../../services/games.service';
import { injectQuery } from '@tanstack/angular-query-experimental';

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

  readonly totalWins = computed(() => {
    return this.completedGames().filter((g) => g.score && g.score.emcali > g.score.opponent).length;
  });

  readonly totalLosses = computed(() => {
    return this.completedGames().filter((g) => g.score && g.score.emcali < g.score.opponent).length;
  });

  readonly totalPoints = computed(() => {
    return this.completedGames().reduce((acc, g) => acc + (g.score?.emcali || 0), 0);
  });

  readonly avgPoints = computed(() => {
    return this.completedGames.length > 0
      ? (this.totalPoints() / this.completedGames().length).toFixed(1)
      : '0';
  });

  cardsData = [
    { title: 'Total Games', content: this.completedGames().length },
    { title: 'Total Wins', content: this.totalWins() },
    { title: 'Total Losses', content: this.totalLosses() },
    { title: 'Average Points per Game', content: parseFloat(this.avgPoints()) },
  ];

  getStatusBadgeClass(status: string): string {
    const styles: { [key: string]: string } = {
      completed: 'bg-primary/20 text-primary border border-primary/30',
      upcoming: 'bg-secondary/20 text-secondary border border-secondary/30',
      'in-progress': 'bg-accent/20 text-accent border border-accent/30',
    };
    return styles[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      completed: 'Completed',
      upcoming: 'Upcoming',
      'in-progress': 'in-progress',
    };
    return labels[status] || '';
  }

  getResultBadgeClass(game: Game): string {
    if (!game.score) return '';
    const isWin = game.score.emcali > game.score.opponent;
    return isWin ? 'bg-primary/30 text-primary' : 'bg-destructive/30 text-destructive';
  }

  getResultLabel(game: Game): string {
    if (!game.score) return '';
    const isWin = game.score.emcali > game.score.opponent;
    return isWin ? 'Victory' : 'Loss';
  }
}
