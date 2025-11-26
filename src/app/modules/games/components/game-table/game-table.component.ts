import { Component, inject, input} from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { StatsService } from "../../../../core/services/stats.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  imports: [RouterLink],
})
export class GameTableComponent {
  private readonly statsService = inject(StatsService);
  readonly id = input.required<number>();
  readonly players = injectQuery(() => ({
    queryKey: [QUERY_KEYS.GAME_PLAYERS, this.id()] as const,
    queryFn: ({queryKey}) => {
      const gameId = queryKey[1];
      return this.statsService.getGamePlayers(gameId)}
    }));
}
