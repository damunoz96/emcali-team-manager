export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string
          id: number
          location: string
          opponent: string
          opponent_score: number
          score: number
          status: Database["public"]["Enums"]["game_status"]
        }
        Insert: {
          created_at?: string
          id?: number
          location: string
          opponent: string
          opponent_score: number
          score: number
          status?: Database["public"]["Enums"]["game_status"]
        }
        Update: {
          created_at?: string
          id?: number
          location?: string
          opponent?: string
          opponent_score?: number
          score?: number
          status?: Database["public"]["Enums"]["game_status"]
        }
        Relationships: []
      }
      players: {
        Row: {
          active: boolean
          birth_date: string
          created_at: string
          id: number
          image: string | null
          last_name: string
          name: string
          number: number
          position: Database["public"]["Enums"]["position"]
        }
        Insert: {
          active?: boolean
          birth_date: string
          created_at?: string
          id?: number
          image?: string | null
          last_name: string
          name: string
          number: number
          position: Database["public"]["Enums"]["position"]
        }
        Update: {
          active?: boolean
          birth_date?: string
          created_at?: string
          id?: number
          image?: string | null
          last_name?: string
          name?: string
          number?: number
          position?: Database["public"]["Enums"]["position"]
        }
        Relationships: []
      }
      stats: {
        Row: {
          assists: number | null
          created_at: string
          fouls: number
          game_id: number
          player_id: number
          points: number
          rebounds: number | null
        }
        Insert: {
          assists?: number | null
          created_at?: string
          fouls?: number
          game_id: number
          player_id: number
          points?: number
          rebounds?: number | null
        }
        Update: {
          assists?: number | null
          created_at?: string
          fouls?: number
          game_id?: number
          player_id?: number
          points?: number
          rebounds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_stats_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_players_stats: {
        Args: never
        Returns: {
          average_fouls: number
          average_points: number
          player_id: number
          player_last_name: string
          player_name: string
          player_number: number
          player_position: string
          total_fouls: number
          total_games: number
          total_points: number
        }[]
      }
      get_all_players_stats_filtered: {
        Args: { min_games?: number; position_filter?: string }
        Returns: {
          average_fouls: number
          average_points: number
          player_id: number
          player_last_name: string
          player_name: string
          player_number: number
          player_position: string
          total_fouls: number
          total_games: number
          total_points: number
        }[]
      }
      get_games_stats: {
        Args: never
        Returns: {
          average_points: number
          lost: number
          total: number
          won: number
        }[]
      }
      get_player_game_history_detailed: {
        Args: { limit_param?: number; player_id_param: number }
        Returns: {
          assists: number
          fouls: number
          game_date: string
          game_id: number
          opponent: string
          opponent_score: number
          points: number
          rebounds: number
          result: string
          team_score: number
        }[]
      }
      get_player_stats_detailed: {
        Args: { player_id_param: number }
        Returns: {
          average_fouls: number
          average_points: number
          total_fouls: number
          total_games: number
          total_points: number
        }[]
      }
    }
    Enums: {
      game_status: "upcoming" | "completed"
      position: "g" | "f" | "pf"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      game_status: ["upcoming", "completed"],
      position: ["g", "f", "pf"],
    },
  },
} as const
