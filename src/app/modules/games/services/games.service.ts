import { Injectable } from "@angular/core";
import { supabase } from "../../../core/supabase/supabase.client";
import { AddGameOptions } from "../models/games.model";

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

  async addGame(options: AddGameOptions) {
    if(options.id) {
      await supabase
        .from('stats')
        .delete()
        .eq('game_id', options.id)
        .throwOnError();
    }
    const { data: game } = await supabase
      .from('games')
      .upsert({
        id: options.id,
        opponent: options.opponent,
        score: options.score,
        opponent_score: options.opponent_score,
        location: options.location,
        status: 'completed'
      })
      .select()
      .single()
      .throwOnError();

    const inserData = options.players.map((p) => ({
      player_id: p.id,
      game_id: game.id,
      points: p.points,
      fouls: p.fouls,
    }));
    const { data } = await supabase
      .from('stats')
      .insert(inserData)
      .throwOnError();
    return data;
  }

  async deleteGameById (id:number){
    const { data, error } = await supabase
      .from('games')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    return data
  }
}
