import { Injectable } from "@angular/core";
import { supabase } from "../../../core/supabase/supabase.client";

@Injectable({ providedIn: 'root' })

export class GameService {
  async getGames(options: { page: number }) {
    const init = (options.page - 1) * 10;
    const end = (options.page * 10) - 1;
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })
      .range(init, end);
    if (error) throw error;
    return data;
  }

  async getStats() {
    const { data, error } = await supabase.rpc('get_games_stats');
    if (error) throw error;
    return data[0];
  }

  async getGame(id: number) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
}
