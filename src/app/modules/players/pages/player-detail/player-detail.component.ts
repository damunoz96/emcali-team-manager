import { Component, inject, input, numberAttribute } from "@angular/core";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";
import { PlayerService } from "../../services/players.service";
import { StatsService } from "../../../../shared/services/stats.service";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [BackButtonComponent , DatePipe],
})
export class PlayerDetailComponent {
  private readonly playerService = inject(PlayerService);
  private readonly statsService = inject(StatsService);
  readonly playerId = input.required({ transform: numberAttribute, alias: 'id' });

  readonly player = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER, this.playerId()],
    queryFn: () => this.playerService.getPlayerById(this.playerId()),
    enabled: Boolean(this.playerId()),
  }));

  readonly stats = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER_STATS, this.playerId()],
    queryFn: () => this.statsService.getPlayerStatsDetailed(this.playerId()),
    enabled: Boolean(this.playerId()),
  }));

  readonly history = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER_HISTORY, this.playerId()],
    queryFn: () => this.statsService.getPlayerStatsById(this.playerId()),
    enabled: Boolean(this.playerId()),
  }))

}
