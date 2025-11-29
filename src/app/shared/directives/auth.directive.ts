import { computed, Directive, inject } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { injectQuery } from "@tanstack/angular-query-experimental";

@Directive({
  selector: '[appAuth]',
  host: { '[class]': 'clx()' },
})
export class AuthDirective {
  private readonly auth = inject(AuthService);
  readonly user = injectQuery(() => this.auth.options());

  readonly clx = computed(() => {
    const user = this.user.data();
    if (user) return '';
    return 'hidden';
  });
}
