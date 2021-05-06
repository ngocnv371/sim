import * as barrack from "@/core/barrack";

import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { BarrackState } from "@/core/barrack/BarrackState";
import { Party } from "@/core/character/Party";
import { RootState } from "@/store/RootState";

const getters: GetterTree<BarrackState, RootState> = {
  parties(state) {
    return state.parties.filter((p) => p.id !== barrack.UNASSIGNED_PARTY_ID);
  },
  unassignedMembers(state) {
    return state.parties[0].members;
  },
  unassignedParty(state) {
    return state.parties[0];
  },
};

const mutations: MutationTree<BarrackState> = {
  SET_PARTIES(state, parties) {
    state.parties = parties;
  },
  REMOVE: barrack.removeParty,
  ADD: barrack.addParty,
  HIRE: barrack.hire,
  FIRE: barrack.fire,
  KICK(state, { party, one }) {
    barrack.kick(state, party, one);
  },
  JOIN(state, { party, index, one }) {
    barrack.join(state, party, index, one);
  },
};

const actions: ActionTree<BarrackState, RootState> = {
  init(context) {
    // create unassigned party
    const unassigned: Party = {
      id: barrack.UNASSIGNED_PARTY_ID,
      name: barrack.UNASSIGNED_PARTY_Name,
      members: [],
    };
    context.commit("ADD", unassigned);

    // create fake data
    const guys = [...context.rootGetters["tavern/adventurers"]];
    const first = [];
    while (first.length < 8) {
      first.push(guys.pop());
    }
    const party = {
      id: "initial party",
      name: "Entourage",
      members: first,
    };
    context.commit("ADD", party);
    while (guys.length) {
      const one = guys.pop();
      context.commit("HIRE", one);
    }
  },
  remove(context, one) {
    context.commit("REMOVE", one);
  },
  add(context, one) {
    context.commit("ADD", one);
  },
  join(context, payload) {
    context.commit("JOIN", payload);
  },
  kick(context, payload) {
    context.commit("KICK", payload);
  },
  fire(context, payload) {
    context.commit("FIRE", payload);
  },
};

export const BarrackModule: Module<BarrackState, RootState> = {
  namespaced: true,
  state: { parties: [] },
  getters,
  mutations,
  actions,
};
