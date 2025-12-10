import { Component, inject, input, numberAttribute, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { GameService } from "../../services/games.service";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { GameTableComponent } from "../../components/game-table/game-table.component";
import { AuthDirective } from "../../../../shared/directives/auth.directive";
import { RouterLink } from "@angular/router";
import { ModalComponent } from "../../../../shared/components/modal";
import { DeleteGameModalComponent } from "../../components/delete-game-modal.component";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  imports: [ DatePipe, GameTableComponent, AuthDirective, RouterLink, ModalComponent, DeleteGameModalComponent],
})
export class GameDetailComponent {
  private readonly gameService = inject(GameService);
  readonly gameId = input.required({transform: numberAttribute, alias: 'id'});
  readonly isOpen = signal(false);

  readonly game = injectQuery( () => ({
    queryKey: [QUERY_KEYS.GAME, this.gameId()],
    queryFn: () => this.gameService.getGame(this.gameId()),
  }))





}
