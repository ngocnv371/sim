<template>
  <div>
    <button class="button--grey" v-if="over" @click="startGame">Start</button>
    <button class="button--grey" v-else @click="stop">Stop</button>
    <p>Game over: {{ over }}</p>
    <table v-if="playerParty.length">
      <thead>
        <th>Player party</th>
        <th>Monster party</th>
      </thead>
      <tbody>
        <tr>
          <td>
            <Combatant :combatant="playerParty[0]" />
          </td>
          <td>
            <Combatant :combatant="monsterParty[0]" />
          </td>
        </tr>
        <tr>
          <td>
            <Combatant :combatant="playerParty[1]" />
          </td>
          <td>
            <Combatant :combatant="monsterParty[1]" />
          </td>
        </tr>
        <tr>
          <td>
            <Combatant :combatant="playerParty[2]" />
          </td>
          <td>
            <Combatant :combatant="monsterParty[2]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import Combatant from "@/components/battle/Combatant.vue";

const combatants = [
  {
    id: "skeleton1",
    name: "Bob",
    int: 10,
    str: 15,
    dex: 16,
    faction: "player",
    life: 100,
    maxLife: 100,
  },
  {
    id: "skeleton2",
    name: "Weist",
    int: 10,
    str: 15,
    dex: 16,
    faction: "player",
    life: 100,
    maxLife: 100,
  },
  {
    id: "player",
    name: "Summoner",
    int: 20,
    str: 10,
    dex: 12,
    faction: "player",
    life: 100,
    maxLife: 100,
  },
  {
    id: "wolf1",
    name: "Wolf Alpha",
    int: 10,
    str: 15,
    dex: 10,
    faction: "monster",
    life: 100,
    maxLife: 100,
  },
  {
    id: "wolf2",
    name: "Wolf Bitch",
    int: 10,
    str: 15,
    dex: 12,
    faction: "monster",
    life: 100,
    maxLife: 100,
  },
  {
    id: "wolf3",
    name: "Wolf Pub",
    int: 10,
    str: 15,
    dex: 15,
    faction: "monster",
    life: 100,
    maxLife: 100,
  },
];

export default {
  components: { Combatant },
  computed: {
    ...mapGetters("battle", ["over", "playerParty", "monsterParty"]),
  },
  methods: {
    ...mapActions("battle", ["start", "stop"]),
    startGame() {
      this.start(combatants);
    },
  },
};
</script>
