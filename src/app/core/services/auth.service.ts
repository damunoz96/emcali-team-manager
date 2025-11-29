import { Injectable } from "@angular/core";
import { supabase } from "../supabase/supabase.client";
import { Observable } from "rxjs";
import { User } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../constants/query-keys";

@Injectable({ providedIn: 'root' })
export class AuthService {
  async login(options: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword(options);
    if (error) throw error;
    return data;
  }

  getUser() {
    return new Observable<User | null>((subscriber) => {
      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        subscriber.next(session?.user ?? null);
        return () => sub.data.subscription.unsubscribe();
      });
    });
  }

  async getUserV2() {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  options() {
    return queryOptions({
      queryKey: [QUERY_KEYS.AUTH_STATE],
      queryFn: () => this.getUserV2(),
      staleTime: Infinity,
    })
  }
}
