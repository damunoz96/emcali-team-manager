import { Component, inject, input, numberAttribute } from "@angular/core";
import { Player, Position } from "../../models/player.models";
import { NonNullableFormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { PlayerService } from "../../services/players.service";
import { ModalComponent } from "../../../../shared/components/modal";
import { toast } from "ngx-sonner";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";

@Component({
  selector: 'app-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class EditPlayerModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly playerService = inject(PlayerService);
  private readonly client = inject(QueryClient);
  readonly playerId = input.required<number>();

  readonly modal = inject(ModalComponent);
  group = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    last_name: ['', [Validators.required]],
    birth_date: ['', [Validators.required]],
    number: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    position: ['' as Position, [Validators.required]],
  });
  name = input.required<string | undefined>();
  last_name = input.required<string | undefined>();
  birth_date = input.required<string | undefined>();
  number = input.required<number | undefined>();
  position = input.required<Position | undefined>();


  closeModal() {
    this.modal.close();
  }

  async handleEditPlayer() {
    try {
      await this.playerService.updatePlayerById(this.playerId(), {
        name: this.group.getRawValue().name,
        last_name: this.group.getRawValue().last_name,
        birth_date: this.group.getRawValue().birth_date,
        number: this.group.getRawValue().number,
        position: this.group.getRawValue().position,
      });
      toast('Player update successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      this.closeModal();
      this.client.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYER, this.playerId()],
      });
    }
  }
}
