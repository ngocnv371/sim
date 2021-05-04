<template>
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
</template>

<script>
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
import { mapGetters } from "vuex";
export default {
  components: { AdventurerThumbnail },
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
