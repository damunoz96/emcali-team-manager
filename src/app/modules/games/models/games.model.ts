import { Tables } from '../../../core/models/database.types';

export type Game = Tables<'games'>;

export type AddGameOptions = {
  id?: number;
  score: number;
  opponent_score: number;
  opponent: string;
  location: string;
  date: string;
  players: {
    id: number;
    name: string;
    points: number;
    fouls: number;
  }[];
};
