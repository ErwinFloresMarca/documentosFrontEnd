<template>
  <el-footer :height="footer.height">
    <div class="flex flex-wrap justify-between">
      <span>
        Copyright © {{ new Date().getFullYear() }} <strong>{{ name }}</strong>
      </span>
      <span> Versión: {{ version }} </span>
    </div>
  </el-footer>
</template>

<script>
import useLayout from '../store/layout';

export default {
  name: 'AdminFooter',
  setup() {
    const layout = useLayout();
    const { footer } = layout;
    const name = import.meta.env.VITE_APP_NAME;
    const version = import.meta.env.VITE_APP_VERSION;
    return {
      footer,
      name,
      version,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  background-color: v-bind('footer.backgroundColor');
  font-size: 0.8rem;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
