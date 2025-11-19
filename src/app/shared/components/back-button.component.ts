import { Location } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-back-button',
  template: `
  <button
    class="cursor-pointer"
    (click)="goBack()">Atras</button>
  `,
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
