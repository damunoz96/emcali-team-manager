import { Component, inject, input } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { StatsService } from "../../../../core/services/stats.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-history-stats',
  templateUrl: './history-stats.component.html',
  imports: [DatePipe],
})
export class HistoryStatsComponent {
  private readonly statsService = inject(StatsService);
  readonly id = input.required<number>();

  readonly history = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER_HISTORY, this.id()] as const,
    queryFn: ({ queryKey }) => {
      const playerId = queryKey[1];
      return this.statsService.getPlayerMatches(playerId);
    },
  }));
}
