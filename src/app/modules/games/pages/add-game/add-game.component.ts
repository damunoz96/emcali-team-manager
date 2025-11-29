import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { PlayerService } from "../../../players/services/players.service";

@Component ({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  imports: []
})

export class AddGameComponent {
  //private readonly fb = inject(NonNullableFormBuilder);
  //readonly group = this.fb.group({
  //  score: [0, Validators.required, Validators.min(0)],
  //  opponent: ['', Validators.required, Validators.minLength(2), Validators.maxLength(20)],
  //  opponent_score: [0, Validators.required, Validators.min(0)],
  //  location: ['', Validators.required, Validators.minLength(0), Validators.maxLength(20)],
  //})
  private readonly queryClient = inject(QueryClient);
  private readonly playerService = inject(PlayerService);

  readonly players = injectQuery(() => ({
    queryKey:[QUERY_KEYS.PLAYERS_DATA],
    queryFn: async () => await this.playerService.getAllPlayersData()
  }))
}
