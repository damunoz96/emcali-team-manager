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
import { Position } from '../../models/player.models';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class AddPlayerModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly playerService = inject(PlayerService);
  readonly modal = inject(ModalComponent);


  readonly group = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    birth_date: ['', [Validators.required]],
    number: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    position: ['' as Position, [Validators.required]],
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
    }
  }
}
