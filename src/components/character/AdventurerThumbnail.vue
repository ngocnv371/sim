<template>
  <v-card dark v-on="$listeners" v-bind="$attrs">
    <v-img v-if="adventurer" :src="adventurer.avatar" class="align-end">
      <div class="text--white align-center slight-shadow" v-if="adventurer">
        <JobIcon :job="adventurer.job" /> Lv{{ adventurer.level }}
      </div>
    </v-img>
    <v-img v-else src="../../assets/help.png" class="align-center"> </v-img>
  </v-card>
</template>

<style scoped>
.slight-shadow {
  text-shadow: 1px 1px gray;
}
</style>

<script>
import JobIcon from "@/components/character/JobIcon.vue";

export default {
  components: { JobIcon },
  props: {
    adventurer: {
      type: Object,
    },
  },
};
</script>
