<template>
  <v-card dark v-on="$listeners" v-bind="$attrs">
    <v-img :src="adventurer.avatar" class="align-end">
      <div class="text--white align-center slight-shadow"><v-icon>mdi-sword</v-icon> Lv{{ adventurer.level }}</div>
    </v-img>
  </v-card>
</template>

<style scoped>
.slight-shadow {
  text-shadow: 1px 1px gray;
}
</style>

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
