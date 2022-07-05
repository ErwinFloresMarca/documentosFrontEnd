<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold uppercase">NUEVA CARTA</span>
          <el-button type="primary" size="default" :icon="ArrowLeftBold" @click="$router.go(-1)">Atrás</el-button>
        </div>
      </template>
      <nuevo-form-vue />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue';
import NuevoFormVue from '@/views/cartas/nuevo.form.vue';
</script>
<script lang="ts">
export default {
  name: 'NuevaCartaPage',
};
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
