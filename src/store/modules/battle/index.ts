import * as battle from "@/core/battle";
import * as config from "@/core/battle/Config";

import { BattleState } from "@/core/battle";
import { Module } from "vuex";
import { RootState } from "@/store/RootState";

export const BattleModule: Module<BattleState, RootState> = {
  namespaced: true,
  state: battle.create([]),
  getters: {
    combatants(state) {
      return state.combatants;
    },
    playerParty(state) {
      return battle.getCombatantsByFaction(state, config.FACTION_PLAYER);
    },
    monsterParty(state) {
      return battle.getCombatantsByFaction(state, config.FACTION_MONSTER);
    },
    over(state) {
      return state.over;
    },
  },
  mutations: {
    UPDATE(state, delta) {
      battle.update(state, delta);
    },
    INIT(state, combatants) {
      state.combatants = combatants;
      state.over = false;
    },
    END(state) {
      battle.end(state);
    },
    SET_TIMER_HANDLE(state, handle) {
      state.timerHandle = handle;
    },
  },
  actions: {
    start(context, characters) {
      const { combatants } = battle.create(characters);
      context.commit("INIT", combatants);
      let lastUpdate = new Date().getTime();
      const updateTimerHandle = setInterval(() => {
        console.log("update interval hit");
        if (battle.isGameOver(context.state)) {
          context.commit("END");
          console.log("game is already over");
          clearInterval(updateTimerHandle);
          return;
        }
        // step
        const now = new Date().getTime();
        const delta = now - lastUpdate;
        context.commit("UPDATE", delta);
        lastUpdate = now;
      }, 100);
      context.commit("SET_TIMER_HANDLE", updateTimerHandle);
    },
    stop(context) {
      context.commit("END");
    },
  },
};
