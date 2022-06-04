<template>
  <el-aside width="fit-content">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="menuCollapsed"
      :collapse-transition="true"
      :background-color="menu.backgroundColor"
      :text-color="menu.textColor"
      :active-text-color="menu.activeTextColor"
    >
      <div class="logo-inst">
        <div class="flex flex-width justify-center items-center" style="width: 63px">
          <el-image>
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
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { Document, Menu as IconMenu, Location, Setting, Picture as IconPicture } from '@element-plus/icons-vue';
import useLayout from '../store/layout';

export default {
  name: 'AdminMenu',
  components: { Document, IconMenu, Location, Setting, IconPicture },
  setup() {
    const layout = useLayout();
    const { header, menu } = layout;
    const { width } = useWindowSize();
    const menuCollapsed = computed({
      get: () => {
        return width.value > 766 ? menu.collapse : true;
      },
    });
    return {
      menu,
      header,
      menuCollapsed,
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
