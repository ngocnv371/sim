<template>
  <v-item-group mandatory v-model="selectedItem">
    <v-container>
      <v-row>
        <v-col v-for="one of adventurers" :key="one.id" cols="4" md="3" class="pa-0 ma-auto">
          <v-item v-slot="{ active, toggle }">
            <AdventurerCard :adventurer="one" :active="active" @click="toggle" />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import AdventurerCard from "@/components/character/AdventurerCard.vue";
import { mapGetters } from "vuex";
export default {
  components: { AdventurerCard },
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    ...mapGetters("tavern", ["adventurers"]),
  },
};
</script>
