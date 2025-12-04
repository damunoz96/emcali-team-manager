import { Injectable } from '@angular/core';
import { supabase } from '../../../core/supabase/supabase.client';
import { PlayerInsert, PlayerUpdate } from '../models/player.models';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  async getPlayers(options: { page: number }) {
    const init = (options.page - 1) * 12;
    const end = options.page * 12 - 1;
    const { data, error, count } = await supabase
      .from('players')
      .select('*', { count: 'exact' })
      .range(init, end)
      .order('name', { ascending: true });
    if (error) throw error;
    return { data, count };
  }

  async getAllPlayersData() {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data;
  }


  async getPlayerAndGamesById(id: number) {
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

  async createNewPlayer(options: PlayerInsert) {
    const { data, error } = await supabase.from('players').insert([options]).select();
    if (error) throw error;
    return data;
  }

  async upsertPlayer(options: PlayerInsert) {
    const {data, error} = await supabase
      .from('players')
      .upsert(options)
      .select()
      .single();
    if (error) throw error;
    return data
  }
  async deactivatePlayerById(id: number) {
    const { data, error } = await supabase
      .from('players')
      .update({ active: false} as PlayerUpdate)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data;
  }
  async activatePlayerById(id: number) {
    const { data, error } = await supabase
      .from('players')
      .update({ active: true} as PlayerUpdate)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data;
  }
}
