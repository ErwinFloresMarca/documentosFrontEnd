<template>
  <el-tooltip :content="isDark ? t('change light') : t('change dark')" placement="bottom">
    <el-button type="info" :plain="!isDark" circle @click="toggleDark()">
      <i-ph-cloud-moon-bold v-if="!isDark" class="icon-footer" />
      <i-ph-sun-horizon-bold v-else class="icon-footer" />
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isDark, toggleDark } from '@/utils/dark';

export default defineComponent({
  setup() {
    const { t } = useI18n();
    return {
      t,
      isDark,
      toggleDark,
    };
  },
});
</script>

<style scoped>
.el-button {
  height: 40px;
}
</style>
