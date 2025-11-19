import { Component, input } from '@angular/core';

export interface GamePlayerStats {
  id: number;
  number: number;
  name: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
}

@Component({
  selector: 'app-game-team-detail',
  template: `
    <div class="bg-card rounded-xl shadow-elevated border border-border mb-8">
      <div class="p-6 border-b border-border bg-gradient-subtle">
        <h2 class="text-2xl font-bold text-foreground flex items-center gap-2">
          Estadísticas de Jugadores - Emcali
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-muted/50">
              <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">#</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Jugador</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-foreground">MIN</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-foreground">PTS</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-foreground">REB</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-foreground">AST</th>
            </tr>
          </thead>
          <tbody>
            Aqui van las stats de los jugadores @for (player of gameTeamStats(); track player.id) {
            <tr
              key="{player.id}"
              class="border-t border-border hover:bg-muted/30 transition-colors duration-200"
            >
              <td class="px-6 py-4 text-foreground font-bold">{{ player.number }}</td>
              <td class="px-6 py-4 text-foreground font-medium">{{ player.name }}</td>
              <td class="px-6 py-4 text-center text-muted-foreground">{{ player.minutes }}</td>
              <td class="px-6 py-4 text-center">
                <span class="font-semibold text-primary">{{ player.points }}</span>
              </td>
              <td class="px-6 py-4 text-center text-muted-foreground">{{ player.rebounds }}</td>
              <td class="px-6 py-4 text-center">
                <span class="font-semibold text-accent">{{ player.assists }}</span>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class GameTeamStatsComponent {
  gameTeamStats = input.required<GamePlayerStats[]>();
}
