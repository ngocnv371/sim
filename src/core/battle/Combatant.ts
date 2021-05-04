import { Character } from "../character/Character";

export interface Combatant extends Character {
  cooldown: number;
  elapsedCooldown: number;
}
