import { Component, inject } from "@angular/core";
import { ModalComponent } from "../../../../shared/components/modal";

@Component({
  selector: 'app-add-game-modal',
  templateUrl: "./add-game-modal.component.html"
})
export class AddGameModalComponent {
  readonly modal = inject(ModalComponent);

  closeModal() {
    this.modal.close();
  }
}
