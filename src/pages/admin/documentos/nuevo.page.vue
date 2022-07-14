<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold uppercase">{{ !documento ? 'NUEVA DOCUMENTO' : 'ASIGNAR AREAS' }}</span>
          <el-button v-if="!documento" type="primary" size="default" :icon="ArrowLeftBold" @click="$router.go(-1)"
            >Atrás</el-button
          >
        </div>
      </template>
      <nuevo-form-vue v-if="!documento" @success="onSuccessSave" />
      <asignar-areas v-else :documento-id="documento.id" @save="onSaveAsignacion" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue';
import NuevoFormVue from '@/views/documentos/nuevo.form.vue';
import AsignarAreas from '@/views/documentos/asignar-areas.vue';
// import PhFloppyDisk from '~icons/ph/floppy-disk';
// import PhBuildings from '~icons/ph/buildings';
const router = useRouter();

// const activeStep = ref(0);
const documento = ref();
const onSuccessSave = (data) => {
  documento.value = data;
};

const onSaveAsignacion = () => {
  router.push({
    name: 'DocumentosList',
  });
};
</script>
<script lang="ts">
export default {
  name: 'NuevaDocumentoPage',
};
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
