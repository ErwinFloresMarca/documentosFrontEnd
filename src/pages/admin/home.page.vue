<template>
  <div>
    <el-card class="box-card">
      <el-collapse>
        <el-collapse-item title="FILTRAR POR AREAS" name="area">
          <AdminListAreas />
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import AdminListAreas from '@/views/areas/admin-list-areas.vue';
</script>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped></style>
