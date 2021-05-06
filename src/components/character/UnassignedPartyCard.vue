<template>
  <v-card>
    <v-card-title v-text="party.name"></v-card-title>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="one of party.members" :key="one.id" class="pa-1">
          <AdventurerThumbnail :adventurer="one" @click="handleFire(one)"> </AdventurerThumbnail>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
import { mapActions, mapGetters } from "vuex";
import { Character } from "@/core/character/Character";

interface Data {
  members: Character[];
}
export default {
  components: { AdventurerThumbnail },
  props: {
    party: {
      type: Object,
      required: true,
    },
  },
  data(): Data {
    const members = this.party.members.slice();
    while (members.length < 8) {
      members.push(null);
    }
    return {
      members,
    };
  },
  computed: {
    ...mapGetters("barrack", ["unassignedMembers"]),
  },
  methods: {
    ...mapActions("barrack", ["fire"]),
    handleFire(one: Character): void {
      this.fire(one);
    },
  },
};
</script>
