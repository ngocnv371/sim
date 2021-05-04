<template>
  <figure>
    <span v-if="isDead"> (x_x) </span>
    <span v-else> (ಠ_ಠ) </span>
    <figcaption v-text="combatant.name"></figcaption>
    <ProgressBar color="danger" :max="combatant.maxLife" :value="combatant.life" />
    <div style="margin-top: 3px" />
    <ProgressBar color="success" :max="combatant.cooldown" :value="isDead ? 0 : combatant.elapsedCooldown" />
  </figure>
</template>

<script>
import ProgressBar from "@/components/battle/ProgressBar.vue";

export default {
  components: { ProgressBar },
  props: {
    combatant: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDead() {
      return this.combatant.life <= 0;
    },
  },
};
</script>
