<template>
  <div class="btn-report-container">
    <el-dialog v-model="showDialog" title="REPORTE DE DOCUMENTOS" width="300px">
      <el-form :model="filterData" :rules="rules" label-width="80px" :inline="false" size="normal" label-position="top">
        <el-form-item label="Rango de fecha" prop="createdAt">
          <filter-input v-model="filterData.createdAt" operator="between">
            <template #default="props">
              <el-date-picker
                v-model="props.filter.value"
                type="daterange"
                range-separator="A"
                start-placeholder="fecha inicio"
                end-placeholder="fecha fin"
              />
            </template>
          </filter-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button :loading="loading" @click="showDialog = false">Cancelar</el-button>
          <el-button :loading="loading" type="primary" @click="onDownloadReport">GENERAR REPORTE</el-button>
        </span>
      </template>
    </el-dialog>
    <el-button
      class="custom-btn"
      :loading="loading"
      type="success"
      :icon="PhExcel"
      size="default"
      plain
      @click="onReport"
      >REPORTE</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import useService from '@/api/http';
import PhExcel from '~icons/ph/file-xls-bold';

const props = defineProps({
  areaId: {
    type: Number,
    required: true,
  },
  tipoDocumentosId: {
    type: Number,
    required: true,
  },
});

const showDialog = ref(false);
const service = useService();
const filterData = ref({ createdAt: null });
const rules = {
  createdAt: [{ required: true, message: 'Este campo es requerido.', trigger: 'blur' }],
};
const loading = ref(false);

function onReport() {
  showDialog.value = true;
}
async function onDownloadReport() {
  loading.value = true;
  await service.download(`areas/${props.areaId}/documentos/report`, {
    filter: JSON.stringify({
      where: {
        ...filterData.value,
        tipoDocumentosId: props.tipoDocumentosId,
      },
      order: 'createdAt ASC',
    }),
  });
  // .then((resp) => {
  //   console.log('reporte response: ', resp);
  // })
  // .catch((err) => {
  //   ElMessage({
  //     type: 'error',
  //     message: 'Error al generar reporte',
  //     duration: 3000,
  //   });
  // });
  loading.value = false;
}
</script>

<script lang="ts">
export default {
  name: 'DocReport',
};
</script>

<style lang="scss" scoped>
.btn-report-container {
  width: fit-content;
  height: fit-content;
}

.custom-btn {
  font-size: 1.5rem;
}
</style>
