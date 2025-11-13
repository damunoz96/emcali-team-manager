import { Component } from '@angular/core';
import { Game, GameCardComponent } from '../components/game-card.component';
import { CardComponent } from "../../../shared/components/card.component";


@Component({
  selector: 'games-page',
  templateUrl: './games-page.html',
  imports: [GameCardComponent, CardComponent],
})
export class GamesPage {

  games: Game[] = [
    {
      id: 1,
      date: '2024-06-15',
      opponent: 'Dragones',
      location: 'Coliseo Evangelista Mora',
      score: { emcali: 100, opponent: 90 },
      status: 'completed',
    },
    {
      id: 2,
      date: '2024-06-10',
      opponent: 'END',
      location: 'Coliseo Evangelista Mora',
      score: { emcali: 80, opponent: 30 },
      status: 'completed',
    },
    {
      id: 3,
      date: '2024-06-05',
      opponent: 'Leones',
      location: 'Coliseo Evangelista Mora',
      score: { emcali: 50, opponent: 10 },
      status: 'completed',
    },
    {
      id: 4,
      date: '2024-06-20',
      opponent: 'Tigres',
      location: 'Coliseo Evangelista Mora',
      status: 'upcoming',
    },
    {
      id: 5,
      date: '2024-06-25',
      opponent: 'Águilas',
      location: 'Coliseo Evangelista Mora',
      status: 'upcoming',
    },
  ];

  cardsData = [
    { title: 'Total Games', content: this.completedGames.length },
    { title: 'Total Wins', content: this.totalWins },
    { title: 'Total Losses', content: this.totalLosses },
    { title: 'Average Points per Game', content: parseFloat(this.avgPoints) },
  ];

  get completedGames(): Game[] {
    return this.games.filter((g) => g.status === 'completed');
  }

  get upcomingGames(): Game[] {
    return this.games.filter((g) => g.status === 'upcoming');
  }

  get totalWins(): number {
    return this.completedGames.filter((g) => g.score && g.score.emcali > g.score.opponent).length;
  }

  get totalLosses(): number {
    return this.completedGames.filter((g) => g.score && g.score.emcali < g.score.opponent).length;
  }

  get totalPoints(): number {
    return this.completedGames.reduce((acc, g) => acc + (g.score?.emcali || 0), 0);
  }

  get avgPoints(): string {
    return this.completedGames.length > 0
      ? (this.totalPoints / this.completedGames.length).toFixed(1)
      : '0';
  }

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
