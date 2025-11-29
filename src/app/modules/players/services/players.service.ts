import { Injectable } from '@angular/core';
import { supabase } from '../../../core/supabase/supabase.client';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  async getPlayers(options: { page: number }) {
    const init = (options.page - 1) * 12;
    const end = options.page * 12 - 1;
    const { data, error, count } = await supabase
      .from('players')
      .select('*', { count: 'exact' })
      .range(init, end);
    if (error) throw error;
    return { data, count };
  }

  async getPlayerById(id: number) {
    const { data, error } = await supabase
      .from('players')
      .select(
        `
        *,
        games:stats (
          games(*)
        )
      `
      )
      .eq('id', id)
      .single();
    if (error) throw error;
    return {
      ...data,
      games: data.games.map((g) => g.games),
    };
  }

  async createNewPlayer(options: {
    name: string;
    last_name: string;
    birth_date: string;
    number: number;
    position: 'g' | 'f' | 'pf';
  }) {
    const { data, error } = await supabase.from('players').insert([options]).select();
    if (error) throw error;
    return data
  }
}
