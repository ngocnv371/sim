import * as config from "./Config";

import { BattleState } from "./BattleState";
import { Character } from "../character/Character";
import { Combatant } from "./Combatant";

function getPlayer(state: BattleState) {
  return state.combatants.find((c) => c.id === config.FACTION_PLAYER);
}

function isDead(character: Character) {
  return character.life <= 0;
}

function isPlayerDead(state: BattleState) {
  const player = getPlayer(state);
  return !player || isDead(player);
}

export function getCombatantsByFaction(state: BattleState, faction: string) {
  return state.combatants.filter((c) => c.faction === faction);
}

function isAllMonstersDead(state: BattleState) {
  return !getCombatantsByFaction(state, config.FACTION_MONSTER).some((c) => !isDead(c));
}

export function isGameOver(state: BattleState) {
  return isPlayerDead(state) || isAllMonstersDead(state);
}

function calculateAttackCooldown(character: Character) {
  return Math.floor((10 / character.dex) * config.BASE_ATTACK_COOLDOWN);
}

function calculateAttackDamage(character: Character) {
  return 15;
}

function applyDamageTo(combatant: Combatant, damage: number) {
  console.log(`${combatant.id} takes ${damage} damage`);
  combatant.life -= damage;
  if (combatant.life < 0) {
    combatant.life = 0;
    console.log(`${combatant.id} is dead`);
  }
}

function getLivingCombatants(state: BattleState) {
  return state.combatants.filter((c) => !isDead(c));
}

function getEnemyFaction(combatant: Combatant) {
  return combatant.faction === config.FACTION_MONSTER ? config.FACTION_PLAYER : config.FACTION_MONSTER;
}

function getWeakiestEnemy(state: BattleState, combatant: Combatant) {
  const list = getCombatantsByFaction(state, getEnemyFaction(combatant));
  const sorted = list.filter((c) => c.life > 0).sort((a, b) => a.life - b.life);
  return sorted[0];
}

export function end(state: BattleState) {
  console.log("battle ends");
  state.over = true;
  clearInterval(state.timerHandle);
}

export function update(state: BattleState, delta: number) {
  console.log("update battle");
  if (state.over) {
    return;
  }
  // update cooldown
  getLivingCombatants(state).forEach((c) => {
    c.elapsedCooldown += delta;
  });
  state.combatants.forEach((c) => {
    // must check again because they it be killed by previous combatant
    if (state.over || isDead(c)) {
      return;
    }
    console.log(`process combat for ${c.id}`);
    if (c.elapsedCooldown > c.cooldown) {
      c.elapsedCooldown = 0;
      const enemy = getWeakiestEnemy(state, c);
      if (!enemy) {
        end(state);
      }
      const dmg = calculateAttackDamage(c);
      applyDamageTo(enemy, dmg);
      console.log(`${c.name} attack ${enemy.name} for ${dmg} damage`);
    }
  });
}

export function begin(state: BattleState) {
  console.log("battle begins");
  let lastUpdate = new Date().getTime();
  const handle = setInterval(() => {
    if (isGameOver(state)) {
      end(state);
    }
    // step
    const now = new Date().getTime();
    const delta = now - lastUpdate;
    update(state, delta);
    lastUpdate = now;
  }, 100);
  state.timerHandle = handle;
}

export function create(characters: Character[]): BattleState {
  return {
    over: true,
    timerHandle: 0,
    combatants: characters.map((c) => ({
      ...c,
      cooldown: calculateAttackCooldown(c),
      elapsedCooldown: 0,
    })),
  };
}
