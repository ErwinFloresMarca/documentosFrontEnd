<template>
  <el-header height="70px">
    <div class="flex flex-wrap justify-between items-center p-2" style="height: 100%">
      <span>logo inst</span>
      <div class="flex flex-wrap justify-end items-center">
        <BtnDarkMode />
        <avatar-menu />
      </div>
    </div>
  </el-header>
</template>

<script>
import AvatarMenu from './components/avatarMenu.vue';
import BtnDarkMode from './components/btnDarkMode.vue';
import useLayout from '../store/layout';

export default {
  name: 'AdminHeader',
  components: { AvatarMenu, BtnDarkMode },
  setup() {
    const layout = useLayout();
    const { header } = layout;
    return {
      header,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  background-color: v-bind('header.backgroundColor');
}
</style>
