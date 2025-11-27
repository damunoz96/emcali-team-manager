import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { ButtonHeaderComponent } from "../layout/components/button-header.component";
import { AvatarPipe } from "../../pipes/avatar.pipe";

@Component({
  selector: 'app-login-button',
  imports: [AsyncPipe, ButtonHeaderComponent, AvatarPipe],
  host: { class: 'flex justify-center items-center' },
  template: `
    @if (user$ | async; as user) {
      <button (click)="logout()">
        <img class="rounded-full w-8 h-8 object-cover" [src]="user.email | avatar" />
      </button>
    } @else {
      <app-button-header path="/admin" text="Login" [isExact]="false"/>
    }
  `,
})
export class LoginButtonComponent {
  private readonly auth = inject(AuthService);

  user$ = this.auth.getUser();

  logout() {
    this.auth.logout();
  }
}

