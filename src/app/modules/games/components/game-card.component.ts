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
      class="relative bg-card rounded-xl p-6 shadow-elevated border border-border hover:shadow-glow transition-all duration-300"
    >
      <span class="absolute top-3 right-4 rounded-full text-xs text-accent font-semibold">
        {{ game.status }}
      </span>
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-10">
            <div class="text-3xl text-primary">Emcali</div>
            <div class="text-3xl font-bold text-primary">{{ game.score?.emcali || 0 }}</div>
          </div>
          <div class="text-2xl text-muted-foreground">vs</div>
          <div class="flex items-center gap-10">
            <div class="text-3xl font-bold text-foreground">
              {{ game.score?.opponent || 0 }}
            </div>
            <div class="text-3xl text-white">{{ game.opponent }}</div>
          </div>
        </div>
          <div class="flex items-center gap-5 w-full justify-center border-t border-border pt-2">
            <span class=" text-muted-foreground font-light">{{
              game.date
            }}</span>
            <span class=" text-muted-foreground ">
              {{ game.location }}
            </span>
          </div>
      </div>
    </div>
  `,
})
export class GameCardComponent {
  @Input() game!: Game;
}
