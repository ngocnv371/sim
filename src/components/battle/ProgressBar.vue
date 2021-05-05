<template>
  <div class="progress-bar">
    <div
      class="progress-bar--inner"
      :class="{ [`progress-bar--${color}`]: true }"
      :style="{ width: `${percentage}%` }"
    ></div>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "info",
      validator(v: string): boolean {
        const valid = ["info", "danger", "success"];
        return valid.includes(v);
      },
    },
  },
  computed: {
    percentage(): number {
      return Math.floor((this.value / this.max) * 100);
    },
  },
};
</script>

<style scoped>
.progress-bar {
  background-color: rgb(197, 223, 231);
  width: 100%;
  height: 3px;
}
.progress-bar > .progress-bar--inner {
  background-color: rgb(71, 190, 236);
  width: 100%;
  height: 100%;
}
.progress-bar--danger {
  background-color: rgb(235, 150, 150);
}
.progress-bar > .progress-bar--danger {
  background-color: rgb(238, 103, 103);
}
.progress-bar--success {
  background-color: rgb(163, 238, 163);
}
.progress-bar > .progress-bar--success {
  background-color: rgb(103, 235, 103);
}
</style>
