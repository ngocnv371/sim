import { Character } from "./Character";

export interface Party {
  id: string;
  name: string;
  members: Character[];
}
