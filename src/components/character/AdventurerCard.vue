<template>
  <figure>
    <span> (ಠ_ಠ) </span>
    <figcaption v-text="adventurer.name"></figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>
