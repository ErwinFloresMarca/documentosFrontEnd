<script setup lang="ts">
import es from 'element-plus/lib/locale/lang/es';

const locale = es;
</script>

<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
