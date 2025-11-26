import { Component, inject, input, numberAttribute } from "@angular/core";
import { DatePipe } from "@angular/common";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { GameService } from "../../services/games.service";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { GameTableComponent } from "../../components/game-table/game-table.component";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  imports: [BackButtonComponent, DatePipe, GameTableComponent],
})
export class GameDetailComponent {
  private readonly gameService = inject(GameService);
  readonly gameId = input.required({transform: numberAttribute, alias: 'id'});

  readonly game = injectQuery( () => ({
    queryKey: [QUERY_KEYS.GAME, this.gameId()],
    queryFn: () => this.gameService.getGame(this.gameId()),
  }))



}
