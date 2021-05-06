<template>
  <v-card>
    <v-card-title v-text="party.name"></v-card-title>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="index of 8" :key="index" class="pa-1">
          <AdventurerPicker
            v-model="members[index - 1]"
            :adventurers="unassigned"
            @input="handleMemberChanged(index - 1, $event)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import AdventurerPicker from "@/components/character/AdventurerPicker.vue";
import { mapActions, mapGetters } from "vuex";
import { Character } from "@/core/character/Character";

interface Data {
  members: Character[];
}
export default {
  components: { AdventurerPicker },
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
    ...mapGetters("barrack", ["unassigned"]),
  },
  methods: {
    ...mapActions("barrack", ["join", "kick"]),
    handleMemberChanged(index: number, newVal: Character): void {
      const oldValue = this.party.members[index];
      if (oldValue) {
        this.kick({ party: this.party, one: oldValue });
      }
      this.join({ party: this.party, index, one: newVal });
    },
  },
};
</script>
