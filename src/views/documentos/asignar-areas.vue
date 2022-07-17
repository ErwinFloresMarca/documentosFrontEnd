<template>
  <div v-if="documento" v-loading="loading">
    <el-descriptions title="Información de la documento" direction="vertical" :column="3" border>
      <el-descriptions-item label="Numero de documento">{{ documento.numDoc }}</el-descriptions-item>
      <el-descriptions-item label="Fecha de recepción">{{
        $luxonDateTime.fromISO(documento.fechaRecepcion.toString()).toFormat('dd/LL/yyyy HH:mm:ss')
      }}</el-descriptions-item>
      <el-descriptions-item label="Tipo de documento">
        <el-tag size="small">{{ documento?.tipoDocumento?.nombre }}</el-tag>
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
import useDocumentoEventoResourceApi from '@/api/modules/documento-evento';
import DocumentoEventoTipos from '@/utils/documento-eventos';
import useAuth from '@/store/auth';

const areasSeleccionadas = ref<Array<number>>([]);
const areaRsrc = useResourceApi<Area>('areas');
const documentoRsrc = useResourceApi<Documento>('documentos');
const deRsrc = useDocumentoEventoResourceApi();

const props = defineProps({
  documentoId: {
    // eslint-disable-next-line no-undef
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(['save']);
const areas = ref<Array<Area>>([]);
const documento = ref<Documento | undefined>();
const loading = ref(false);
const auth = useAuth();

async function initComponent() {
  if (props.documentoId) {
    loading.value = true;
    // objener documento
    await documentoRsrc
      .getById(props.documentoId, { filter: { include: ['tipoDocumento'] } })
      .then(async ({ data }) => {
        if (data) {
          documento.value = data;
          // obtener areas
          await areaRsrc
            .list({ filter: { where: { tipoDocumentos: { id: { inq: [documento?.value?.tipoDocumentosId] } } } } })
            .then(({ data }) => {
              if (data) {
                areas.value = data;
              }
            });
          // obtener areas relacionadas
          await documentoRsrc.getLinks(documento.value?.id || 0, 'areas').then(({ data }) => {
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
  if (documento.value !== undefined) {
    await areasSeleccionadas.value.every((areaId) =>
      documentoRsrc
        .link(documento.value?.id || 0, 'areas', { relationId: areaId, link: true })
        .then(({ data }) => data),
    );
    // redistrar evento
    const evDesignado = DocumentoEventoTipos.designado;
    if (documento.value && documento.value.tipoUltimoEvento !== evDesignado.tipo) {
      deRsrc
        .create({
          tipoEvento: evDesignado.tipo,
          color: evDesignado.color,
          documentoId: documento.value.id,
          ejecutor: auth.user ? { ...auth.user } : undefined,
        })
        .then(() => {
          emit('save');
        });
    }
    // eslint-disable-next-line no-undef
    ElMessage({
      message: 'Asignaciones guardadas',
      type: 'success',
      duration: 3000,
    });
  }
};
</script>
<script lang="ts">
export default {
  name: 'AsignarAreas',
};
</script>
<style scoped></style>
