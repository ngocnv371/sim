<template>
  <v-dialog fullscreen v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-question-mark</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-item-group mandatory v-model="selectedValue">
        <v-container>
          <v-row dense>
            <v-col v-for="one of adventurers" :key="one.id" cols="12">
              <v-item v-slot="{ active, toggle }">
                <AdventurerCard :adventurer="one" :active="active" @click="toggle" />
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import AdventurerCard from "@/components/character/AdventurerCard.vue";
import { Character } from "@/core/character/Character";

interface Data {
  localValue: Character | null;
  selectedValue: Character | null;
  dialog: boolean;
}
export default {
  components: {
    AdventurerCard,
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
      selectedValue: null,
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
};
</script>
