import { Component } from "@angular/core";
import { PlayerCardComponent } from "../components/player-card.component";
import { CardComponent } from "../../../shared/components/card.component";

const players = [
  { name: 'Daniel', last_name: 'Munoz', position: 'F', games: 10, points: 200, fouls: 5 },
  { name: 'Fabian', last_name: 'Duenas', position: 'PG', games: 10, points: 500, fouls: 2 },
  { name: 'Camilo', last_name: 'Garcia', position: 'G', games: 10, points: 1000, fouls: 1 },
  { name: 'Mateo', last_name: 'Munoz', position: 'F', games: 10, points: 200, fouls: 5 },
  { name: 'Andrey', last_name: 'Duenas', position: 'PG', games: 10, points: 500, fouls: 2 },
  { name: 'LeBron', last_name: 'Garcia', position: 'G', games: 10, points: 1000, fouls: 1 },
];

const cardsData = [
  { title: 'Total Players', content: players.length },
];



@Component({
  selector: 'players-page',
  templateUrl: './players-page.html',
  imports: [CardComponent, PlayerCardComponent],
})
export class PlayersPage {

  dataSourcePlayers = players;
  datasourceCards = cardsData;

}
