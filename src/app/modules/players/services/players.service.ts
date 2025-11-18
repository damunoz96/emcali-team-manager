import { Injectable } from "@angular/core";
import { supabase } from "../../../core/supabase/supabase.client";

@Injectable({ providedIn: 'root' })

export class PlayerService {
  async getAllPlayers(){
    const { data, error } = await supabase
      .from('players')
      .select('*')
    if (error) throw error;
    return data
  }

  async getPlayers(options: { page: number }) {
      const init = (options.page - 1) * 12;
      const end = (options.page * 12) - 1;
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .range(init,end)
      if (error) throw error;
      return data;
    }
}
