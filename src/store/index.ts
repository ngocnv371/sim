import { BarrackModule } from "./modules/barrack";
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
      context.dispatch("barrack/init");
    },
  },
  modules: {
    battle: BattleModule,
    tavern: TavernModule,
    barrack: BarrackModule,
  },
});
