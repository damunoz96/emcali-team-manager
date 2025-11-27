import { Component, computed, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Player } from "../models/player.models";
import { AvatarPipe } from "../../../shared/pipes/avatar.pipe";
import { StatsService } from "../../../core/services/stats.service";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../core/constants/query-keys";

@Component({
  selector: 'app-player-card',
  template: `
    @let player = this.player();
    <div
      [routerLink]="this.link()"
      class="bg-card border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group cursor-pointer block"
    >
    <div class="p-6">
      <!-- Player Content -->
      <div class="flex flex-col items-center text-center">
        <!-- Avatar -->
        <div class="relative mb-4">
          <img
            [src]="player.id | avatar"
            [alt]="player.id"
            class="w-24 h-24 rounded-full border-3 border-primary/30 shadow-glow object-cover"
          />
          <!-- Number Badge -->
          <div
            class="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-2 border-card"
          >
            {{player.number}}
          </div>
        </div>

        <!-- Name -->
        <h3
          class="font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2"
        >
          {{player.name}} {{player.last_name}}
        </h3>

        <!-- Position -->
        <span
          class="inline-block px-4 py-1.5 rounded-full text-sm text-card-foreground font-semibold border bg-primary/80 border-primary"
        >
          {{player.position.toLocaleUpperCase()}}
        </span>
      </div>
    </div>
  </div>
  `,
  imports: [RouterLink, AvatarPipe],
})
export class PlayerCardComponent {
  player = input.required<Player>();
  link = computed(() => `/players/${this.player().id}`);
}
