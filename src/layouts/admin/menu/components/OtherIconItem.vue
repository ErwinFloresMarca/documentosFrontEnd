<template>
  <el-icon class="el-svg-icon">
    <component :is="icon" />
  </el-icon>
</template>

<script>
// import * as PhIcons from '~icons/ph/.*';

export default {
  name: 'OtherIconItem',
  props: {
    icon: {
      type: String,
      default: 'list',
    },
  },
  setup() {
    return {
      // PhIcons,
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
