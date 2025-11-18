import { Component, computed, inject } from "@angular/core";
import { Player, PlayerCardComponent } from "../components/player-card.component";
import { CardComponent } from "../../../shared/components/card.component";
import { PlayerService } from "../services/players.service";
import { injectInfiniteQuery, injectQuery } from "@tanstack/angular-query-experimental";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
  selector: 'app-players-page',
  templateUrl: './players.component.html',
  imports: [CardComponent, PlayerCardComponent, InfiniteScrollDirective],
})
export class PlayersComponent {

  private readonly playerService = inject(PlayerService);

  readonly players = injectInfiniteQuery( () => ({
    queryKey:['players'],
    queryFn: ({pageParam}) => this.playerService.getPlayers({page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < 12) return undefined;
      return lastPageParam + 1
    },
    select: (data) => data.pages.flat(),
  }));

  readonly allPlayers = injectQuery( () => ({
    queryKey:['all-players'],
    queryFn: () => this.playerService.getAllPlayers(),
  }));

  readonly totalPlayers = computed(() => {
    return this.allPlayers.data()?.length;
  })

}

