<template>
  <v-card :color="active ? 'primary' : ''" class="d-flex align-center" dark v-on="$listeners">
    <v-card-title v-text="adventurer.name" />
  </v-card>
</template>

<script>
export default {
  props: {
    adventurer: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
