<template>
  <v-dialog fullscreen v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="!value" color="red lighten-2" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-question</v-icon>
      </v-btn>
      <AdventurerThumbnail v-else v-on="on" :adventurer="value" width="100" />
    </template>

    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row dense>
          <v-col v-for="one of adventurers" :key="one.id" cols="12">
            <AdventurerCard :adventurer="one">
              <v-btn text color="primary accent-4" @click="handleHire(one)"> Hire $50 </v-btn>
            </AdventurerCard>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import AdventurerCard from "@/components/character/AdventurerCard.vue";
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
import { Character } from "@/core/character/Character";

interface Data {
  localValue: Character | null;
  dialog: boolean;
}
export default {
  components: {
    AdventurerCard,
    AdventurerThumbnail,
  },
  props: {
    adventurers: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: false,
    },
  },
  data(): Data {
    return {
      localValue: this.value,
      dialog: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newValue: Character): void {
        this.localValue = newValue;
      },
    },
  },
  methods: {
    handleHire(one: Character): void {
      this.$emit("input", one);
      this.dialog = false;
    },
  },
};
</script>
