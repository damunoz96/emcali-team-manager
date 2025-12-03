import { Component, inject, input, numberAttribute } from "@angular/core";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";
import { PlayerService } from "../../services/players.service";
import { StatsService } from "../../../../core/services/stats.service";
import { InfiniteData, injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { HistoryStatsComponent } from "../../components/history-stats/history-stats.component";
import { AvatarPipe } from "../../../../shared/pipes/avatar.pipe";
import { Player } from "../../models/player.models";
import { AuthDirective } from "../../../../shared/directives/auth.directive";

type PlayersQuery = InfiniteData<{ items: Player, count: number }>;

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [
    BackButtonComponent,
    HistoryStatsComponent,
    AvatarPipe,
    AuthDirective
],
})
export class PlayerDetailComponent {
  private readonly playerService = inject(PlayerService);
  private readonly statsService = inject(StatsService);
  readonly client = inject(QueryClient);

  readonly playerId = input.required({ transform: numberAttribute, alias: 'id' });

  readonly player = injectQuery<Player>(() => ({
    queryKey: [QUERY_KEYS.PLAYER, this.playerId()],
    queryFn: () => this.playerService.getPlayerById(this.playerId()),
    placeholderData: () => {
      const players = this.client.getQueryData<PlayersQuery>([QUERY_KEYS.PLAYERS]);
      const allPlayers = players?.pages.flatMap((p) => p.items);
      return allPlayers?.find((p) => p.id === this.playerId());
    }
  }));

  readonly stats = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER_STATS, this.playerId()],
    queryFn: () => this.statsService.getPlayerStatsDetailed(this.playerId()),
  }));
}
