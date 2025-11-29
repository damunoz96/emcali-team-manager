import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { PlayerService } from '../../services/players.service';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { QUERY_KEYS } from '../../../../core/constants/query-keys';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class AddPlayerModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly playerService = inject(PlayerService);
  private readonly queryClient = inject(QueryClient);
  readonly modal = inject(ModalComponent);


  readonly group = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    birth_date: ['', [Validators.required]],
    number: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    position: ['' as 'g' | 'f' | 'pf', [Validators.required]],
  });

  closeModal() {
    this.modal.close();
  }

  async handleAddPlayer() {
    try {
      const group = this.group.getRawValue();
      await this.playerService.createNewPlayer(group);
      toast.success('Player created successfully');
    } catch (error) {
      toast.error('Something is wrong');
    } finally {
      this.group.reset();
      this.closeModal();
      this.queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYERS]
      })

    }
  }
}
