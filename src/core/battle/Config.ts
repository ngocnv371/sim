/**
 * A combatant with `dex` of `10` will attack once every second.
 * With `dex` of `20`, it will attack twice every second.
 * This meaning attack timer (attack on elapsed) = 10/dex * 1000
 */
export const BASE_ATTACK_COOLDOWN = 1000;
export const FACTION_PLAYER = "player";
export const FACTION_MONSTER = "monster";
export const FACTION_NONE = "none";
