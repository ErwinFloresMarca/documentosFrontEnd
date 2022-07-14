<template>
  <div v-if="documento" v-loading="loading">
    <el-descriptions title="Información de la documento" direction="vertical" :column="3" border>
      <el-descriptions-item label="Numero de documento">{{ documento.numDoc }}</el-descriptions-item>
      <el-descriptions-item label="Solicitante">{{ documento.solicitante }}</el-descriptions-item>
      <el-descriptions-item label="Fecha de recepción">{{
        $luxonDateTime.fromISO(documento.fechaRecepcion).toFormat('dd/LL/yyyy HH:mm:ss')
      }}</el-descriptions-item>
      <el-descriptions-item label="Tipo de documento">
        <el-tag size="small">{{ documento.tipoDocumento.nombre }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <strong
      ><el-icon><ph-buildings /></el-icon> AREAS DE DESTINO</strong
    >
    <div class="m-2">
      <el-checkbox-group v-model="areasSeleccionadas">
        <el-checkbox v-for="area in areas" :key="area.id" :label="area.id" border>{{ area.nombre }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-button type="success" size="default" :icon="PhFloppyDisk" @click="onSave">GUARDAR</el-button>
  </div>
</template>

<script setup lang="ts">
import useResourceApi from '@/api/resource';
import { Area, Documento } from '@/api/types';
import PhFloppyDisk from '~icons/ph/floppy-disk';
import PhBuildings from '~icons/ph/buildings';

const areasSeleccionadas = ref<Array<Area>>([]);
const areaRsrc = useResourceApi<Area>('areas');
const documentoRsrc = useResourceApi<Area>('documentos');

const props = defineProps({
  documentoId: {
    // eslint-disable-next-line no-undef
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(['save']);
const areas = ref([]);
const documento = ref<Documento | undefined>();
const loading = ref(false);
async function initComponent() {
  if (props.documentoId) {
    loading.value = true;
    await documentoRsrc
      .getById(props.documentoId, { filter: { include: ['tipoDocumento'] } })
      .then(async ({ data }) => {
        if (data) {
          documento.value = data;
          await areaRsrc.list().then(({ data }) => {
            if (data) {
              areas.value = data;
            }
          });
          await documentoRsrc.getLinks(documento.value.id, 'areas').then(({ data }) => {
            if (data) areasSeleccionadas.value = data;
          });
          loading.value = false;
        } else {
          documento.value = undefined;
        }
      });
  } else {
    documento.value = undefined;
  }
}
initComponent();
watch(() => props.documentoId, initComponent);
const onSave = async () => {
  await areasSeleccionadas.value.every((areaId) =>
    documentoRsrc.link(documento.value.id, 'areas', { relationId: areaId, link: true }).then(({ data }) => data),
  );
  ElMessage({
    message: 'Asignaciones guardadas',
    type: 'success',
    duration: 3000,
  });
  emit('save');
};
</script>
<script lang="ts">
export default {
  name: 'AsignarAreas',
};
</script>
<style scoped></style>