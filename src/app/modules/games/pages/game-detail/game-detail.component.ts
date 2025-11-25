import { Component, inject, input, numberAttribute } from "@angular/core";
import { DatePipe } from "@angular/common";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { GameService } from "../../services/games.service";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { StatsService } from "../../../../core/services/stats.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  imports: [BackButtonComponent, DatePipe, RouterLink],
})
export class GameDetailComponent {
  private readonly gameService = inject(GameService);
  private readonly statsService = inject(StatsService);
  readonly gameId = input.required({transform: numberAttribute, alias: 'id'});

  readonly game = injectQuery( () => ({
    queryKey: [QUERY_KEYS.GAME, this.gameId()],
    queryFn: () => this.gameService.getGame(this.gameId()),
  }))

  readonly players = injectQuery(() => ({
    queryKey: [QUERY_KEYS.GAME_PLAYERS, this.gameId()],
    queryFn: () => this.statsService.getGamePlayers(this.gameId()),
  }))

}
