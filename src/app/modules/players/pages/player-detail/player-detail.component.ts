import { Component, inject, input, numberAttribute, signal } from "@angular/core";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";
import { PlayerService } from "../../services/players.service";
import { StatsService } from "../../../../core/services/stats.service";
import { InfiniteData, injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { HistoryStatsComponent } from "../../components/history-stats/history-stats.component";
import { AvatarPipe } from "../../../../shared/pipes/avatar.pipe";
import { Player } from "../../models/player.models";
import { AuthDirective } from "../../../../shared/directives/auth.directive";
import { toast } from "ngx-sonner";
import { ModalComponent } from "../../../../shared/components/modal";
import { EditPlayerModalComponent } from "../../components/edit-player-modal/edit-player-modal.component";

type PlayersQuery = InfiniteData<{ items: Player, count: number }>;

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [
    BackButtonComponent,
    HistoryStatsComponent,
    AvatarPipe,
    AuthDirective,
    ModalComponent,
    EditPlayerModalComponent
],
})
export class PlayerDetailComponent {
  private readonly playerService = inject(PlayerService);
  private readonly statsService = inject(StatsService);
  readonly client = inject(QueryClient);
  readonly isOpen = signal(false);

  readonly playerId = input.required({ transform: numberAttribute, alias: 'id' });

  readonly player = injectQuery<Player>(() => ({
    queryKey: [QUERY_KEYS.PLAYER, this.playerId()],
    queryFn: () => this.playerService.getPlayerAndGamesById(this.playerId()),
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

  async handleDeactivatePlayer() {
    try {
      await this.playerService.deactivatePlayerById(this.playerId())
      toast.success('Player deactivated successfully')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      this.client.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYER, this.playerId()]
      })
    }
  }
  async handleActivatePlayer() {
    try {
      await this.playerService.activatePlayerById(this.playerId())
      toast.success('Player Activated successfully')
      console.log(this.player.data())
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      this.client.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYER, this.playerId()]
      })
    }
  }


}
