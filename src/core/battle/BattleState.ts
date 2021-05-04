import { Combatant } from "./Combatant";

export interface BattleState {
  combatants: Combatant[];
  over: boolean;
  timerHandle: number;
}
