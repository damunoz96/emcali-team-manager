import { Component, Input } from "@angular/core";

export interface Game {
  id: number;
  date: string;
  opponent: string;
  location: string;
  score?: { emcali: number; opponent: number };
  status: 'upcoming' | 'completed' ;
}

@Component({
  selector: 'app-game-card',
  template: `
    <div
      class="bg-card rounded-xl p-6 shadow-elevated border border-border hover:shadow-glow transition-all duration-300"
    >
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground font-medium">{{ game.date }}</span>
          </div>
          <span class="text-xs font-semibold px-3 py-1 rounded">
            {{ game.location }}
          </span>
        </div>

        <div class="flex items-center gap-6">
          <div class="text-right">
            <div class="text-sm text-muted-foreground mb-1">Emcali</div>
            <div class="text-3xl font-bold text-primary">{{ game.score?.emcali || 0 }}</div>
          </div>

          <div class="text-2xl font-bold text-muted-foreground">-</div>

          <div class="text-left">
            <div class="text-sm text-muted-foreground mb-1">{{ game.opponent }}</div>
            <div class="text-3xl font-bold text-foreground">
              {{ game.score?.opponent || 0 }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold">
            {{ game.status }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class GameCardComponent {
  @Input() game!: Game;
}
