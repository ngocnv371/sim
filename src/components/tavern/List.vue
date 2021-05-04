<template>
  <ul></ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("tavern", ["adventurers"]),
  },
};
</script>
