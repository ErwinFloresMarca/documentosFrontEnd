<template>
  <el-container direction="vertical">
    <admin-header />
    <el-container direction="horizontal">
      <admin-aside />
      <el-container direction="vertical">
        <admin-main />
        <admin-footer />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AdminHeader from './header/adminHeader.vue';
import AdminMain from './main/adminMain.vue';
import AdminAside from './menu/adminAside.vue';
import AdminFooter from './footer/adminFooter.vue';

export default {
  name: 'AdminLayout',
  components: { AdminHeader, AdminMain, AdminAside, AdminFooter },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 80px);
}
</style>
