import { Injectable } from "@angular/core";
import { supabase } from "../../../core/supabase/supabase.client";

@Injectable({ providedIn: 'root' })
export class GameService {
  async getGames() {
    const { data, error } = await supabase.from('games').select('*');
    if (error) throw error;
    return data;
  }
}
