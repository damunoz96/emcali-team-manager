import { queryOptions } from "@tanstack/angular-query-experimental"
import { QUERY_KEYS } from "../constants/query-keys"
import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"

export const authOptions = () => {
  const authService = inject(AuthService);
  return () => queryOptions({
    queryKey: [QUERY_KEYS.AUTH_STATE],
    queryFn: () => authService.getUserV2(),
    staleTime: Infinity,
  });
}
