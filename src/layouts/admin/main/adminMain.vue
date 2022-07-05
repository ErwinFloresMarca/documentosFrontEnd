<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script>
import useLayout from '../store/layout';

export default {
  name: 'AdminMain',
  setup() {
    const { header, footer } = useLayout();
    return {
      header,
      footer,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  height: calc(100vh - calc(v-bind('header.height') + v-bind('footer.height')));
  background-image: url('/images/logo/logo.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}
</style>
