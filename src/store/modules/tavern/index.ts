import * as tavern from "@/core/tavern";

import { Module } from "vuex";
import { RootState } from "@/store/RootState";
import { TavernState } from "@/core/tavern";

export const TavernModule: Module<TavernState, RootState> = {
  namespaced: true,
  state: { adventurers: [] },
  getters: {
    adventurers(state) {
      return state.adventurers;
    },
  },
  mutations: {
    SET_ADVENTURERS(state, adventurers) {
      state.adventurers = adventurers;
    },
    REMOVE(state, one) {
      tavern.removeOne(state, one);
    },
  },
  actions: {
    init(context) {
      context.dispatch("refresh");
    },
    refresh(context) {
      const more = tavern.attractAdventurers(context.state);
      context.commit("SET_ADVENTURERS", more);
    },
    hire(context, one) {
      context.commit("REMOVE", one);
    },
  },
};
