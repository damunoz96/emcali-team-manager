import { inject } from "@angular/core";
import { CanActivateFn, RedirectCommand, Router } from "@angular/router";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { AuthService } from "../../core/services/auth.service";

export const authGuard: CanActivateFn = async (_route, snapshot) => {
  const client = inject(QueryClient);
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = await client.ensureQueryData(auth.options());
  if (user) return true;
  const redirect = snapshot.url;
  router.navigate(['/admin/login'], {
    queryParams: { redirect }
  });
  return false;
}
