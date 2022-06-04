<template>
  <el-main class="main-container">
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: 'AdminMain',
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 100px);
}
</style>
