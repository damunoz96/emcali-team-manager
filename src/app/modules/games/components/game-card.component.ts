import { Component, computed, input } from "@angular/core";
import { Game } from "../models/games.model";
import { DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-game-card',
  imports: [DatePipe, RouterLink],
  template: `
    @let game = this.game();
    <div
      [routerLink]="link()"
      class="cursor-pointer container relative bg-card rounded-xl p-6 shadow-elevated border border-border hover:shadow-glow transition-all duration-300"
    >
      <span class="absolute top-3 right-4 rounded-full text-xs text-accent font-semibold">
        {{ game.status }}
      </span>
      <div class="flex flex-col items-center gap-4">
        <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-6 max-lg:pt-2">
          <div class="flex items-center justify-end gap-4 lg:gap-10">
            <div class="text-xl lg:text-3xl text-primary">Emcali</div>
            <div class="text-xl lg:text-3xl font-bold text-primary">{{ game.score || 0 }}</div>
          </div>
          <div class="text-md lg:text-2xl text-muted-foreground">vs</div>
          <div class="flex items-center justify-start gap-2 lg:gap-10">
            <div class="text-xl lg:text-3xl font-bold text-foreground">
              {{ game.opponent_score }}
            </div>
            <div class="text-xl lg:text-3xl text-white">{{ game.opponent }}</div>
          </div>
        </div>
          <div class="flex items-center gap-5 w-full justify-center border-t border-border pt-2 mt-4">
            <span class=" text-muted-foreground font-ligh max-lg:text-sm">{{ game.date | date:"dd MMM yyyy hh:mm aa"}}</span>
            <span class="text-muted-foreground max-lg:text-sm">
              {{ game.location }}
            </span>
          </div>
      </div>
    </div>
  `,
})
export class GameCardComponent {
  game = input.required<Game>();
  link = computed(() => `/games/${this.game().id}`)
}
