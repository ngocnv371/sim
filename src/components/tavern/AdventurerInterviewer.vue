<template>
  <AdventurerThumbnail :adventurer="adventurer"></AdventurerThumbnail>
</template>

<script>
import AdventurerThumbnail from "@/components/character/AdventurerThumbnail.vue";
export default {
  components: {
    AdventurerThumbnail,
  },
  props: {
    adventurer: {
      type: Object,
      required: true,
    },
  },
};
</script>
