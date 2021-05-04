<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation v-model="value">
      <v-btn value="home" to="/">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="battle" to="/battle">
        <span>Battle</span>

        <v-icon>mdi-sword</v-icon>
      </v-btn>

      <v-btn value="tavern" to="/tavern">
        <span>Tavern</span>

        <v-icon>mdi-beer</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    value: "recent",
  }),
});
</script>
