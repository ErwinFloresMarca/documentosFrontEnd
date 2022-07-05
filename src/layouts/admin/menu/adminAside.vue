<template>
  <el-aside width="fit-content">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="menuCollapsed"
      :collapse-transition="true"
      :background-color="menu.backgroundColor"
      :text-color="menu.textColor"
      :active-text-color="menu.activeTextColor"
    >
      <div class="logo-inst">
        <div class="flex flex-width justify-center items-center" style="width: 63px">
          <el-image src="/images/logo/logo.png">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div v-if="!menuCollapsed" class="flex flex-width justify-center items-center" style="width: auto">
          <strong class="text-light-50">CARTAS</strong>
        </div>
      </div>
      <MenuItem
        v-for="route in adminRoute.children"
        :key="'/admin/' + route.name"
        :item="route"
        is-nest
        :base-path="'/admin/' + route.path"
      />
    </el-menu>
  </el-aside>
</template>

<script>
import { Picture as IconPicture } from '@element-plus/icons-vue';
import useLayout from '../store/layout';
import MenuItem from './components/MenuItem.vue';
import { adminRoute } from '@/router/route.async';

export default {
  name: 'AdminMenu',
  components: { IconPicture, MenuItem },
  setup() {
    const layout = useLayout();
    const { header, menu } = layout;
    const { width } = useWindowSize();
    const menuCollapsed = computed({
      get: () => {
        return width.value > 766 ? menu.collapse : true;
      },
    });
    const route = useRoute();
    const activeMenu = computed(() => {
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    return {
      menu,
      header,
      menuCollapsed,
      adminRoute,
      activeMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: v-bind('menu.backgroundColor');
  height: 100vh;
}
.logo-inst {
  width: 100%;
  height: v-bind('header.height');
  background-color: v-bind('header.backgroundColor');
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.el-menu-vertical-demo {
  border-color: v-bind('menu.backgroundColor');
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.image-slot .el-icon {
  font-size: 30px;
  color: #fff;
}
</style>
