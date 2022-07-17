<template>
  <div class="tipo-documento-card grid grid-cols-5 grid-rows-2" @click="onClick">
    <div class="col-span-1 row-span-2 align-middle flex flex-wrap items-center justify-center">
      <el-icon :size="40" color="var(--el-color-warning-dark-2)">
        <PhFiles />
      </el-icon>
    </div>
    <div class="col-span-4 row-span-1 text-left">{{ tipoDocumento.nombre }}</div>
    <div class="col-span-2 row-span-1 text-center">
      <el-tooltip content="Documentos sin ver" raw-content>
        <span class="text-sky-400">{{ '' + cantDocumentosAsignados }}</span>
      </el-tooltip>
    </div>
    <div class="col-span-2 row-span-1 text-center">
      <el-tooltip content="Documentos pendientes" raw-content>
        <span class="text-fuchsia-400">{{ '' + cantDocumentosPendientes }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Area, TipoDocumento } from '@/api/types';
import PhFiles from '~icons/ph/files';
import useResourceApi from '@/api/resource';
import DocumentoEventoTipos from '@/utils/documento-eventos';
import { ComodinObject } from '@/types';

const props = defineProps({
  tipoDocumento: {
    type: Object as PropType<TipoDocumento>,
    required: true,
  },
  area: {
    type: Object as PropType<Area>,
    required: true,
  },
});

const emit = defineEmits(['click']);
const cantDocumentosAsignados = ref<number | undefined>(undefined);
const cantDocumentosPendientes = ref<number | undefined>(undefined);
const areaDocumentoResource = useResourceApi(`areas/${props.area.id}/documentos`);
async function initComponent() {
  cantDocumentosAsignados.value = 0;
  cantDocumentosPendientes.value = 0;
  areaDocumentoResource
    .count({
      where: {
        tipoDocumentosId: props.tipoDocumento.id,
        tipoUltimoEvento: DocumentoEventoTipos.designado.tipo,
      },
    })
    .then((resp: ComodinObject) => {
      if (resp.data.count) cantDocumentosAsignados.value = resp.data.count;
    });

  areaDocumentoResource
    .count({
      where: {
        tipoDocumentosId: props.tipoDocumento.id,
        tipoUltimoEvento: DocumentoEventoTipos.pendiente.tipo,
      },
    })
    .then((resp: ComodinObject) => {
      if (resp.data.count) cantDocumentosPendientes.value = resp.data.count;
    });
}
initComponent();
const onClick = () => {
  emit('click', props.tipoDocumento);
};
</script>

<script lang="ts">
export default {
  name: 'CardTipoDocumento',
};
</script>

<style lang="scss" scoped>
.tipo-documento-card {
  font-size: 0.65rem;
  border: 1px solid var(--el-color-warning-dark-2);
  border-radius: 7px;
  padding: 5px;
  background-color: var(--el-color-warning-light-8);
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  background-image: linear-gradient(
      30deg,
      var(--el-color-warning-light-7) 12%,
      transparent 12.5%,
      transparent 87%,
      var(--el-color-warning-light-7) 87.5%,
      var(--el-color-warning-light-7)
    ),
    linear-gradient(
      150deg,
      var(--el-color-warning-light-7) 12%,
      transparent 12.5%,
      transparent 87%,
      var(--el-color-warning-light-7) 87.5%,
      var(--el-color-warning-light-7)
    ),
    linear-gradient(
      30deg,
      var(--el-color-warning-light-7) 12%,
      transparent 12.5%,
      transparent 87%,
      var(--el-color-warning-light-7) 87.5%,
      var(--el-color-warning-light-7)
    ),
    linear-gradient(
      150deg,
      var(--el-color-warning-light-7) 12%,
      transparent 12.5%,
      transparent 87%,
      var(--el-color-warning-light-7) 87.5%,
      var(--el-color-warning-light-7)
    ),
    linear-gradient(
      60deg,
      var(--el-color-warning-light-7) 77 25%,
      transparent 25.5%,
      transparent 75%,
      var(--el-color-warning-light-7) 77 75%,
      var(--el-color-warning-light-7) 77
    ),
    linear-gradient(
      60deg,
      var(--el-color-warning-light-7) 77 25%,
      transparent 25.5%,
      transparent 75%,
      var(--el-color-warning-light-7) 77 75%,
      var(--el-color-warning-light-7) 77
    );
}
</style>
