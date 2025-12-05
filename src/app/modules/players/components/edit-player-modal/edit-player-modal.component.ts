import { Component, computed, effect, inject, input } from "@angular/core";
import { Player, PlayerInsert, Position } from "../../models/player.models";
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { PlayerService } from "../../services/players.service";
import { ModalComponent } from "../../../../shared/components/modal";
import { toast } from "ngx-sonner";
import { injectMutation, QueryClient } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { InputComponent } from "../../../../shared/ui/input/input.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";

@Component({
  selector: 'app-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
})
export class EditPlayerModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly playerService = inject(PlayerService);
  private readonly client = inject(QueryClient);
  private readonly modal = inject(ModalComponent);

  readonly player = input<Player>();

  readonly group = this.fb.group({
    id: this.fb.control<number | undefined>(undefined),
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    last_name: ['', [Validators.required]],
    birth_date: ['', [Validators.required]],
    number: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    position: ['' as Position, [Validators.required]],
  });

  constructor() {
    effect(() => {
      const player = this.player();
      this.group.reset({
        id: player?.id,
        name: player?.name ?? '',
        last_name: player?.last_name ?? '',
        birth_date: player?.birth_date ?? '',
        number: player?.number ?? 0,
        position: player?.position ?? 'f',
      });
    });
  }

  readonly headers = computed(() => {
    const player = this.player();
    if (player) return {
      title: 'Edit player',
      message: 'Update information about this player',
    };
    return {
      title: 'Create player',
      message: 'Fill the form to create a new player'
    }
  });

  readonly upsert = injectMutation(() => ({
    mutationFn: (player: PlayerInsert) => {
      return this.playerService.upsertPlayer(player);
    },
    onSuccess: () => {
      toast.success('Player update successfully');
      this.modal.close();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onSettled: (_result, _error, player) => {
      this.client.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYER, player.id],
      });
    },
  }));

  closeModal() {
    this.modal.close();
  }

  async handleEditPlayer() {
    const data = this.group.getRawValue();
    data.id ??= undefined;
    this.upsert.mutate(data);
  }
}
