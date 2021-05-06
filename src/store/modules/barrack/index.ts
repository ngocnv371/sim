import * as config from "@/config";

import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { BarrackState } from "@/store/modules/barrack/BarrackState";
import { Character } from "@/core/character/Character";
import { Party } from "@/core/character/Party";
import { RootState } from "@/store/RootState";

function getUnassignedParty(state: BarrackState): Party {
  const p = state.parties.find(p => p.id === config.UNASSIGNED_PARTY_ID);
  if (!p) {
    throw new Error(`Party ${config.UNASSIGNED_PARTY_ID} not found`)
  }
  return p;
}

const getters: GetterTree<BarrackState, RootState> = {
  parties(state) {
    return state.parties.filter((p) => p.id !== config.UNASSIGNED_PARTY_ID);
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
  REMOVE(state, party: Party){
    if (party.id === config.UNASSIGNED_PARTY_ID) {
      throw new Error(`Can not remove ${config.UNASSIGNED_PARTY_ID} party`);
    }
    state.parties = state.parties.filter((p) => p.id != party.id);
  },
  ADD(state, party: Party){
    state.parties.push(party);
  },
  HIRE(state, member){
    const party = state.parties.find((p) => p.id === config.UNASSIGNED_PARTY_ID);
    if (!party) {
      throw new Error(`Party ${config.UNASSIGNED_PARTY_ID} not found`);
    }
    party.members.push(member);
  },
  FIRE(state, member){
    // remove from all parties
    const involved = state.parties.filter((p) => p.members.some((m) => m.id === member.id));
    if (!involved.length) {
      throw new Error(`Character ${member.id} does not belong to any party`);
    }
    involved.forEach((p) => {
      p.members = p.members.filter((m) => m.id !== member.id);
    });
  },
  REMOVE_MEMBER_FROM_PARTY(state, { party, member }) {
    party.members = party.members.filter((m: Character) => m.id !== member.id);
  },
  ADD_MEMBER_TO_PARTY(state, { party, index, member }) {
    if (party.id === config.UNASSIGNED_PARTY_ID) {
      party.members.push(member);
    } else {
      const ms = [...party.members];
      ms[index] = member;
      party.members = ms;
    }
  },
};

const actions: ActionTree<BarrackState, RootState> = {
  init(context) {
    // create unassigned party
    const unassigned: Party = {
      id: config.UNASSIGNED_PARTY_ID,
      name: config.UNASSIGNED_PARTY_Name,
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
      const member = guys.pop();
      context.commit("HIRE", member);
    }
  },
  remove(context, member) {
    context.commit("REMOVE", member);
  },
  add(context, member) {
    context.commit("ADD", member);
  },
  addUnassignedMemberToParty(context, payload) {
    // directly add to target party
    context.commit("ADD_MEMBER_TO_PARTY", payload);
    // remove from 'unassigned'
    const { member } = payload;
    const u = getUnassignedParty(context.state);
    context.commit("REMOVE_MEMBER_FROM_PARTY", { party: u, member });
  },
  removeMemberFromParty(context, payload) {
    // remove
    context.commit("REMOVE_MEMBER_FROM_PARTY", payload);
    // put in 'unassigned'
    const { member } = payload;
    const u = getUnassignedParty(context.state);
    context.commit("ADD_MEMBER_TO_PARTY", { party: u, member });
  },
  fire(context, payload) {
    context.commit("FIRE", payload);
  },
  hire(context, payload) {
    context.commit("HIRE", payload);
  },
};

export const BarrackModule: Module<BarrackState, RootState> = {
  namespaced: true,
  state: { parties: [] },
  getters,
  mutations,
  actions,
};
