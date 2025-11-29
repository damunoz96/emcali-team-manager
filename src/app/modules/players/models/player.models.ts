import { Tables, Enums, TablesInsert } from "../../../core/models/database.types";

export type Player = Tables<'players'>;
export type Position = Enums<'position'>;
export type PlayerInsert = TablesInsert<'players'>;
