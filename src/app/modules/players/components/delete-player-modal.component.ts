import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-delete-player-modal',
  template: `
    @let playerId = this.playerId();
    <div class="z-50 flex flex-col bg-card border-border shadow-card">
      <h1>Eliminar jugador</h1>
      <p>Estas seguro de eliminar este jugador con id {{ playerId }}?</p>
      <div>
        <button class="bg-card text-card-foreground">Cancelar</button>
        <button class="bg-primary text-primary-foreground">Eliminar</button>
      </div>
    </div>
  `,
  imports: [],
})
export class DeletePlayerModalComponent {
  playerId = input.required<number>();
}
