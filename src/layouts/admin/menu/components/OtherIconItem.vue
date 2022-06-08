<template>
  <el-icon class="el-svg-icon">
    <component :is="src" />
  </el-icon>
</template>

<script>
// import * as PhIcons from '~icons/ph/.*';
import PhListDashes from '~icons/ph/list-dashes';

export default {
  name: 'OtherIconItem',
  props: {
    icon: {
      type: Object,
      default: PhListDashes,
    },
  },
  setup(props) {
    const src = shallowRef(props.icon);
    watch(
      () => props.icon,
      () => {
        src.value = props.icon;
      },
    );
    return {
      src,
    };
  },
};
</script>

<style scoped>
.el-svg-icon {
  width: 1em;
  height: 1em;
  margin-left: -2px;
  font-size: 20px !important;
  text-align: left !important;
}
</style>
