<template>
  <v-card>
    <v-card-text>
      <div v-text="`${adventurer.class} Lv${adventurer.level}`"></div>
      <p class="display-1 text--primary" v-text="adventurer.name"></p>
      <ul>
        <li>Strength: {{ adventurer.str }}</li>
        <li>Dexterity: {{ adventurer.dex }}</li>
        <li>Intelligence: {{ adventurer.int }}</li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true"> Learn More </v-btn>
      <v-spacer />
      <slot></slot>
    </v-card-actions>

    <v-expand-transition>
      <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%">
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">Origin</p>
          <p>
            late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin
            eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute !important;
  width: 100%;
}
</style>

<script lang="ts">
interface Data {
  reveal: boolean;
}
export default {
  props: {
    adventurer: {
      type: Object,
      required: true,
    },
  },
  data(): Data {
    return {
      reveal: false,
    };
  },
};
</script>
