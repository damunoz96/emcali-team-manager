import { Component, Input, input } from "@angular/core";

export interface Player {
  name: string;
  last_name: string;
  position: string;
  games: number;
  points: number;
  fouls: number;
}

@Component({
  selector: 'app-player-card',
  template: `
    <div
      class="bg-card border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div class="p-6">
        <div class="flex items-start gap-4 mb-4">
          <div class="relative w-16 h-16">
            <div
              class="w-16 h-16 rounded-full border-2 border-primary/30 shadow-glow bg-primary/20 text-primary font-bold flex items-center justify-center text-lg"
            >
              {{ player.name.charAt(0) }}{{ player.last_name.charAt(0) }}
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h3
                class="font-bold text-lg text-foreground group-hover:text-primary transition-colors"
              >
                {{ player.name }}
              </h3>
              <span class="text-2xl font-bold text-muted-foreground">#</span>
            </div>
            <span
              class="inline-block px-3 py-1 rounded-full text-xs font-semibold border text-white"
            >
              {{ player.position }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-muted/50 rounded-lg p-3">
            <p class="text-xs text-muted-foreground mb-1">Score (PPG)</p>
            <div class="flex items-center gap-2">
              <p class="text-xl font-bold text-primary">{{ player.points / player.games }}</p>
            </div>
          </div>
          <div class="bg-muted/50 rounded-lg p-3">
            <p class="text-xs text-muted-foreground mb-1">Games played</p>
            <p class="text-xl font-bold text-foreground">{{ player.games }}</p>
          </div>
        </div>

        <div class="space-y-2 pt-4 border-t border-border">
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Points</span>
            <span class="font-semibold text-foreground">{{ player.points }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Rebounds</span>
            <span class="font-semibold text-foreground"></span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Assits</span>
            <span class="font-semibold text-foreground"></span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PlayerCardComponent {
  @Input() player!: Player;
}
