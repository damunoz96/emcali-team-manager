import { Component, inject  } from '@angular/core';
import { GameService } from '../../games/services/games.service';
import { PlayerService } from '../../players/services/players.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERY_KEYS } from '../../../core/constants/query-keys';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  imports: [],
})
export class HomePage {
  private readonly gameService = inject(GameService);
  private readonly playerService = inject(PlayerService);

  readonly gamesCount = injectQuery (() => ({
    queryKey: [QUERY_KEYS.GAMES_COUNT],
    queryFn: () => this.gameService.getCount()
  }))

  readonly playersCount = injectQuery(() => ({
    queryKey:[QUERY_KEYS.PLAYERS_COUNT],
    queryFn: () => this.playerService.getCount()
  }))

  readonly stats = injectQuery(() => ({
    queryKey: [QUERY_KEYS.PLAYER_STATS],
    queryFn: () => this.gameService.getStats()
  }))
  
}
