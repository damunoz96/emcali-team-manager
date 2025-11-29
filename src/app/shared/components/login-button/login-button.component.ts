
import { Component, inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { ButtonHeaderComponent } from "../layout/components/button-header.component";
import { AvatarPipe } from "../../pipes/avatar.pipe";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";

@Component({
  selector: 'app-login-button',
  imports: [ButtonHeaderComponent, AvatarPipe],
  host: { class: 'flex justify-center items-center' },
  template: `
    @if (user.isLoading()) {
      <div class="h-8 w-8 rounded-full bg-background animate-pulse"></div>
    } @else if (user.data() !== undefined) {
      @let user = this.user.data();
      @if (user) {
        <button (click)="logout()">
          <img class="rounded-full w-8 h-8 object-cover" [src]="user.email | avatar" />
        </button>
      } @else {
        <app-button-header path="/admin" text="Login" [isExact]="false"/>
      }
    }
  `,
})
export class LoginButtonComponent {
  private readonly auth = inject(AuthService);
  private readonly client = inject(QueryClient);

  readonly user = injectQuery(() => this.auth.options());

  logout() {
    this.auth.logout();
    this.client.invalidateQueries({
      queryKey: this.auth.options().queryKey,
    });
  }
}

