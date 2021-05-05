<template>
  <v-dialog v-on="$listeners" v-bind="$attrs">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-question-mark</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-item-group mandatory v-model="selectedItem">
        <v-container>
          <v-row>
            <v-col v-for="one of adventurers" :key="one.id" cols="3" md="4">
              <v-item v-slot="{ active, toggle }">
                <AdventurerThumbnail :adventurer="one" :active="active" @click="toggle" />
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
import { Character } from "@/core/character/Character";

interface Data {
  localValue: Character | null;
  selectedValue: Character | null;
}
export default {
  components: {
    AdventurerThumbnail,
  },
  props: {
    adventurers: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data(): Data {
    return {
      localValue: this.value,
      selectedValue: null,
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
