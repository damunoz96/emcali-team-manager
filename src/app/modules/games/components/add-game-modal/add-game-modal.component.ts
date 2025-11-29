import { Component, inject } from "@angular/core";
import { ModalComponent } from "../../../../shared/components/modal";
import { NonNullableFormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-game-modal',
  templateUrl: "./add-game-modal.component.html"
})
export class AddGameModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);


  readonly modal = inject(ModalComponent);

  readonly group = this.fb.group({

  })

  closeModal() {
    this.modal.close();
  }

}
