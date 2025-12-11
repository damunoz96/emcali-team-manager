import { Component, inject, input, numberAttribute } from "@angular/core";
import { ModalComponent } from "../../../shared/components/modal";
import { Modal } from "flowbite";
import { GameService } from "../services/games.service";
import { toast } from "ngx-sonner";
import { Router } from "@angular/router";
import { ButtonComponent } from "../../../shared/components/button.component";

@Component({
  selector: 'app-delete-game-modal',
  template: `<div
    class="overflow-y-auto overflow-x-hidden fixed flex justify-center z-50 inset-0 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <!-- Contenido del diálogo -->
    <div class="dialog-content sm:max-w-[500px] bg-card rounded-lg shadow-lg p-6">
      <!-- Header -->
      <header class="flex flex-col gap-6">
        <h2 id="dialog-title" class="text-lg text-accent-foreground font-semibold">
          Do you want to delete this game?
        </h2>
        <div class="flex gap-6 justify-end">
          <app-button
            type="button"
            (click)="this.closeModal()"
            variant="primary"
            size="sm"
          >Cancel</app-button>
          <app-button
            type="button"
            (click)="handleDeleteGame()"
            variant="destructive"
            size="sm"
          >Delete</app-button>
        </div>
      </header>
    </div>
  </div>`,
  imports: [ButtonComponent],
})
export class DeleteGameModalComponent {
    private readonly gameService = inject(GameService);
    private readonly router = inject(Router);
    readonly modal = inject(ModalComponent);

    readonly gameId = input.required<number>();

    async handleDeleteGame () {
        try {
            await this.gameService.deleteGameById(this.gameId())
            toast.success('Game successfully deleted');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            this.closeModal();
            this.router.navigate(["/games"]);
        }
    }

    closeModal() {
        this.modal.close();
    }

}