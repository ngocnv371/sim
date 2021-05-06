<template>
  <v-dialog fullscreen v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <AdventurerThumbnail v-bind="attrs" v-on="on" :adventurer="adventurer" width="100" />
    </template>

    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <AdventurerCard :adventurer="adventurer">
        <v-btn text color="primary accent-4" @click="handleHire(adventurer)"> Hire $50 </v-btn>
      </AdventurerCard>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
import AdventurerCard from "@/components/character/AdventurerCard.vue";
import { mapActions } from "vuex";
import { Character } from "@/core/character/Character";

interface Data {
  dialog: boolean;
}
export default {
  components: {
    AdventurerThumbnail,
    AdventurerCard,
  },
  props: {
    adventurer: {
      type: Object,
      required: true,
    },
  },
  data(): Data {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions("tavern", ["hire"]),
    handleHire(one: Character): void {
      this.hire(one);
    },
  },
};
</script>
