<template>
  <el-row>
    <el-col>
      <el-result icon="warning" title="PAGINA NO ENCONTRADA" sub-title="ESTA PAGINA NO EXISTE">
        <template #extra>
          <el-button type="primary" @click="goBack">Atrás</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const router = useRouter();
const goBack = () => {
  router.push({
    name: 'Home',
  });
};
</script>
