import { computed, Directive, inject } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { injectQuery } from "@tanstack/angular-query-experimental";

@Directive({
  selector: '[appAuth]',
  host: { '[class.hidden]': 'authenticated()' },
})
export class AuthDirective {
  private readonly auth = inject(AuthService);
  readonly user = injectQuery(() => this.auth.options());

  readonly authenticated = computed(() => {
    const user = this.user.data();
    return Boolean(user);
  });
}
