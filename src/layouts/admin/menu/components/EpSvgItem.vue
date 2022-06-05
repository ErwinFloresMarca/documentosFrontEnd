<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script>
import * as ElSvg from '@element-plus/icons-vue';

export default {
  name: 'EpSvgItem',
  props: {
    elSvgName: {
      require: true,
      default: 'Fold',
      type: String,
    },
  },
  setup() {
    return {
      ElSvg,
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
