import { Component, inject, signal } from "@angular/core";
import { injectInfiniteQuery } from "@tanstack/angular-query-experimental";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";
import { PlayerCardComponent } from "../../components/player-card.component";
import { CardComponent } from "../../../../shared/components/card.component";
import { PlayerService } from "../../services/players.service";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { ModalComponent } from "../../../../shared/components/modal";
import { AddPlayerModalComponent } from "../../components/add-player-modal/add-player-modal.component";

@Component({
  selector: 'app-players-page',
  templateUrl: './players.component.html',
  imports: [CardComponent, PlayerCardComponent, InfiniteScrollDirective, ModalComponent, AddPlayerModalComponent],
})
export class PlayersComponent {
  private readonly playerService = inject(PlayerService);
  readonly isOpen = signal(false);

  readonly players = injectInfiniteQuery( () => ({
    queryKey:[QUERY_KEYS.PLAYERS],
    queryFn: async ({pageParam}) => {
      const res = await this.playerService.getPlayers({ page: pageParam })
      return {
        items: res.data,
        total: res.count,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.items.length < 12) return undefined;
      return lastPageParam + 1
    },
    select: (data) => ({
      pages: data.pages.map((p) => p.items).flat(),
      total: data.pages[0]?.total ?? 0,
    }),

  }));

}

