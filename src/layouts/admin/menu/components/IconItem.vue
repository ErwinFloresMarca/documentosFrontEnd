<template>
  <OtherIconItem v-if="meta.icon" :icon="meta.icon"></OtherIconItem>
  <EpSvgItem v-else :el-svg-name="meta.elSvgIcon" />
</template>

<script>
import EpSvgItem from './EpSvgItem.vue';
import OtherIconItem from './OtherIconItem.vue';

export default {
  name: 'IconItem',
  components: { EpSvgItem, OtherIconItem },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
