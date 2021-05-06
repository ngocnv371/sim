import * as config from "@/config";

import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { Character } from "@/core/character/Character";
import { RootState } from "@/store/RootState";
import { TavernState } from "./TavernState";
import faker from 'faker';

function generateAdventurers(num: number): Character[] {
  const bag: Character[] = [];
  const jobs = ["Warrior", "Guardian", "Mage", "Healer"];
  for (let index = 0; index < num; index++) {
    const maxLife = faker.datatype.number({ min: 100, max: 200 });
    const maxMana = faker.datatype.number({ min: 100, max: 200 });
    const id = faker.random.alphaNumeric(10);
    const jobIndex = faker.datatype.number({min: 0, max: jobs.length - 1});
    const one: Character = {
      id,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      job: jobs[jobIndex],
      avatar: `https://i.pravatar.cc/150?t=${id}`,
      level: faker.datatype.number({ min: 1, max: 10 }),

      life: faker.datatype.number(maxLife),
      maxLife,

      mana: faker.datatype.number(maxLife),
      maxMana,

      int: faker.datatype.number({ min: 20, max: 50 }),
      str: faker.datatype.number({ min: 20, max: 50 }),
      dex: faker.datatype.number({ min: 20, max: 50 }),

      faction: config.FACTION_NONE,
    };
    bag.push(one);
  }
  return bag;
}

const getters: GetterTree<TavernState, RootState> = {
  adventurers(state) {
    return state.adventurers;
  },
};

const mutations: MutationTree<TavernState> = {
  SET_ADVENTURERS(state, adventurers) {
    state.adventurers = adventurers;
  },
  REMOVE(state, one) {
    state.adventurers = state.adventurers.filter((a) => a.id != one.id);
  },
};

const actions: ActionTree<TavernState, RootState> = {
  init(context) {
    const more = generateAdventurers(config.DEFAULT_TAVERN_SIZE);
    context.commit("SET_ADVENTURERS", more);
  },
  hire(context, one) {
    context.commit("REMOVE", one);
    context.dispatch("barrack/hire", one);
  },
};

export const TavernModule: Module<TavernState, RootState> = {
  namespaced: true,
  state: { adventurers: [] },
  getters,
  mutations,
  actions,
};
