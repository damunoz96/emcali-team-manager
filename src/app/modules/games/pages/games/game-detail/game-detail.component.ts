import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
})
export class GameDetailComponent {
  route = inject(ActivatedRoute);
  gameId = this.route.snapshot.params['id'];


}
