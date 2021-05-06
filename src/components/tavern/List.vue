<template>
  <v-card flat>
    <v-container>
      <v-row dense>
        <v-col v-for="one of adventurers" :key="one.id" cols="3">
          <AdventurerInterviewer :adventurer="one" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import AdventurerInterviewer from "@/components/tavern/AdventurerInterviewer.vue";
import { mapGetters } from "vuex";

export default {
  components: { AdventurerInterviewer },
  computed: {
    ...mapGetters("tavern", ["adventurers"]),
  },
};
</script>
