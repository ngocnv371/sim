<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script lang="ts">
export default {
  props: {
    job: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon(): string {
      const map: { [key: string]: string } = {
        Warrior: "mdi-sword",
        Guardian: "mdi-shield",
        Mage: "mdi-fire",
        Healer: "mdi-hospital",
      };
      return map[this.job] || "mdi-help";
    },
  },
};
</script>
