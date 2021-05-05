<template>
  <v-dialog v-on="$listeners" v-bind="$attrs">
    <template v-slot:activator="{ on, attrs }">
      <v-img height="100" :src="adventurer.avatar" dark v-bind="attrs" v-on="on">
        <v-card-title v-text="adventurer.class"></v-card-title>
      </v-img>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ adventurer.name }}
      </v-card-title>
      <v-card-text>
        <div>{{ adventurer.class }} Lv{{ adventurer.level }}</div>
        <ul>
          <li>Strength: {{ adventurer.str }}</li>
          <li>Dexterity: {{ adventurer.dex }}</li>
          <li>Intelligence: {{ adventurer.int }}</li>
        </ul>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text> Hire $50</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    adventurer: {
      type: Object,
      required: true,
    },
  },
};
</script>
