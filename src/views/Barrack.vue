<template>
  <v-card flat>
    <v-app-bar>
      <v-btn icon @click="addOneParty">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col v-for="p of parties" :key="p.id" cols="12">
          <PartyCard :party="p" />
        </v-col>
        <v-col cols="12" v-if="unassignedParty">
          <UnassignedPartyCard :party="unassignedParty" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import PartyCard from "@/components/character/PartyCard.vue";
import UnassignedPartyCard from "@/components/character/UnassignedPartyCard.vue";

export default {
  components: { PartyCard, UnassignedPartyCard },
  computed: {
    ...mapGetters("barrack", ["parties", "unassignedParty"]),
  },
  methods: {
    ...mapActions("barrack", ["add", "remove"]),
    addOneParty(): void {
      this.add({
        id: new Date().getTime().toString(),
        name: "unnamed party",
        members: [],
      });
    },
  },
};
</script>
