import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BackButtonComponent } from "../../../../shared/components/back-button.component";

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [BackButtonComponent],
})
export class PlayerDetailComponent {
  private route = inject(ActivatedRoute);

  readonly playerId: number = this.route.snapshot.params['id'];



}
