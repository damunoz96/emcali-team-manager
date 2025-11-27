import { AfterViewInit, Component, effect, ElementRef, model, viewChild } from "@angular/core";
import { Modal } from 'flowbite';

@Component({
  selector: 'app-modal',
  template: `
    <div #container class="hidden fixed inset-0 z-50 items-center justify-center bg-black/50 data-modal-show:flex">
      <div class="bg-card rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterViewInit {
  readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly isOpen = model(false);

  private modal?: Modal;

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      if (!this.modal) return;
      if (isOpen) this.modal.show();
      else this.modal.hide();
    });
  }

  ngAfterViewInit(): void {
    const elem = this.container().nativeElement;
    this.modal = new Modal(elem, {
      backdrop: 'static',
      onHide: () => {
        this.isOpen.set(false);
      }
    });
    const isOpen = this.isOpen();
    if (isOpen) this.modal.show();
    else this.modal.hide();
  }

  close() {
    this.modal?.hide();
  }
}
