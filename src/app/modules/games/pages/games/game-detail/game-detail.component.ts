import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "../../../services/games.service";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { BackButtonComponent } from "../../../../../shared/components/back-button.component";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  imports: [BackButtonComponent],
})
export class GameDetailComponent {
  private readonly gameService = inject(GameService);
  route = inject(ActivatedRoute);

  gameId: number = this.route.snapshot.params['id'];

  readonly game = injectQuery( () => ({
    queryKey: ['game', this.gameId],
    queryFn: () => this.gameService.getGame(this.gameId),
  }))

}
