<template>
  <template v-if="!item.hidden">
    <template v-if="showSidebarItem(item, item.children)">
      <LinkMenu v-if="onlyOneChild.meta && !onlyOneChild.hidden" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <icon-item :meta="onlyOneChild.meta || item.meta" />
          <template #title>{{ onlyOneChild.meta?.title }}</template>
        </el-menu-item>
      </LinkMenu>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <icon-item :meta="item.meta" />
        <span>{{ item.meta.title }}</span>
      </template>
      <MenuItem
        v-for="child in showingChildren"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script>
import path from 'path-browserify';
import LinkMenu from './LinkMenu.vue';
import IconItem from './IconItem.vue';
import useAuth from '@/store/auth';

export default {
  name: 'MenuItem',
  components: { LinkMenu, IconItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const onlyOneChild = ref(null);
    const showingChildren = ref([]);
    const auth = useAuth();
    const showSidebarItem = (parent, children = []) => {
      showingChildren.value = children.filter((item) => {
        if (item.meta.hidden || !auth.rolIn(item.meta.roles)) {
          return false;
        }
        onlyOneChild.value = item;
        return true;
      });
      if (showingChildren.value.length === 1 && !parent?.alwaysShow) {
        return true;
      }
      if (showingChildren.value.length === 0) {
        onlyOneChild.value = {
          ...parent,
          path: '',
          noChildren: true,
          hidden: !!parent.children || !auth.rolIn(parent.meta.roles),
        };
        return true;
      }
      return false;
    };
    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath);
    };
    return {
      onlyOneChild,
      resolvePath,
      showSidebarItem,
      showingChildren,
    };
  },
};
</script>

<style lang="scss">
// menu hover
/* .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }
  .is-active>.el-submenu__title {
    color: $subMenuActiveText !important;
  }*/
</style>
