import { BarrackState } from "./BarrackState";
import { Character } from "../character/Character";
import { Party } from "../character/Party";

export const UNASSIGNED_PARTY_ID = "unassigned";
export const UNASSIGNED_PARTY_Name = "Unassigned";
export const MAX_PARTY_SIZE = 8;

export function addParty(state: BarrackState, party: Party): void {
  state.parties.push(party);
}

function getUnassignedParty(state: BarrackState): Party {
  const p = state.parties.find(p => p.id === UNASSIGNED_PARTY_ID);
  if (!p) {
    throw new Error(`Party ${UNASSIGNED_PARTY_ID} not found`)
  }
  return p;
}

export function removeParty(state: BarrackState, party: Party): void {
  if (party.id === UNASSIGNED_PARTY_ID) {
    throw new Error(`Can not remove ${UNASSIGNED_PARTY_ID} party`);
  }
  state.parties = state.parties.filter((p) => p.id != party.id);
}

export function hire(state: BarrackState, one: Character): void {
  const party = state.parties.find((p) => p.id === UNASSIGNED_PARTY_ID);
  if (!party) {
    throw new Error(`Party ${UNASSIGNED_PARTY_ID} not found`);
  }
  party.members.push(one);
}

export function fire(state: BarrackState, one: Character): void {
  // remove from all parties
  const involved = state.parties.filter((p) => p.members.some((m) => m.id === one.id));
  if (!involved.length) {
    throw new Error(`Character ${one.id} does not belong to any party`);
  }
  involved.forEach((p) => {
    p.members = p.members.filter((m) => m.id !== one.id);
  });
}

export function kick(state: BarrackState, party: Party, one: Character) {
  party.members = party.members.filter((m) => m.id !== one.id);
  if (party.id !== UNASSIGNED_PARTY_ID) {
    // move to unassigned
    const un = getUnassignedParty(state);
    un.members.push(one);
  }
}

export function join(state: BarrackState, party: Party, index: number, one: Character) {
  const ms = [...party.members];
  ms[index] = one;
  party.members = ms;
  kick(state, getUnassignedParty(state), one);
}