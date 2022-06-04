<template>
  <el-header :height="header.height">
    <div class="flex flex-wrap justify-between items-center p-2" :style="`height: 100%; width: 100%`">
      <div class="flex flex-wrap justify-start items-center">
        <a class="menu-collapse-btn hidden-xs-only" @click="menuToggle">
          <i-ph-text-indent v-if="menu.collapse" />
          <i-ph-text-outdent v-else />
        </a>
      </div>
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
    const { header, menu, menuToggle } = layout;
    return {
      header,
      menu,
      menuToggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  background-color: v-bind('header.backgroundColor');
}
.menu-collapse-btn {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}
</style>
