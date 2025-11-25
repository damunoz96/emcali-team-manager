import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase/supabase.client';

@Injectable({ providedIn: 'root' })
export class StatsService {
  async getPlayerStatsById(id: number) {
    const { data, error } = await supabase.from('stats').select('*').eq('player_id', id)
    .order('created_at', { ascending: false })
    .limit(5);
    if (error) throw error;
    return data;
  }

  async getPlayerStatsDetailed(id: number) {
    const { data, error } = await supabase.rpc('get_player_stats_detailed', { player_id_param: id });
    if (error) throw error;
    return data[0];
  }

  async getPlayerMatches(id: number) {
    const { error, data } = await supabase.from('games')
      .select(`
        *,
        stats!inner (
          *,
          players!inner (id)
        )
      `)
      .eq('stats.players.id', id)
      .order('created_at', { ascending: false })
      .limit(5);
    if (error) throw error;
    return data.map((game) => ({
      ...game,
      stats: game.stats.at(0)!,
    }));
  }
}
