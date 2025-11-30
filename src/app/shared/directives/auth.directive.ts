import { computed, Directive, inject } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { injectQuery } from "@tanstack/angular-query-experimental";

@Directive({
  selector: '[appAuth]',
  host: { '[class.hidden]': 'hide()' },
})
export class AuthDirective {
  private readonly auth = inject(AuthService);
  readonly user = injectQuery(() => this.auth.options());

  readonly hide = computed(() => {
    const user = this.user.data();
    return !user;
  });
}
