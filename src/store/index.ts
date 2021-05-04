import { BattleModule } from "./modules/battle";
import { TavernModule } from "./modules/tavern";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    init(context) {
      context.dispatch("tavern/init");
    }
  },
  modules: {
    battle: BattleModule,
    tavern: TavernModule,
  },
});
