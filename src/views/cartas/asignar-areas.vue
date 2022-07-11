<template>
  <div v-if="carta" v-loading="loading">
    <el-descriptions title="Información de la carta" direction="vertical" :column="3" border>
      <el-descriptions-item label="Numero de documento">{{ carta.numDoc }}</el-descriptions-item>
      <el-descriptions-item label="Solicitante">{{ carta.solicitante }}</el-descriptions-item>
      <el-descriptions-item label="Fecha de recepción">{{
        $luxonDateTime.fromISO(carta.fechaRecepcion).toFormat('dd/LL/yyyy HH:mm:ss')
      }}</el-descriptions-item>
      <el-descriptions-item label="Tipo de carta">
        <el-tag size="small">{{ carta.tipoCarta.nombre }}</el-tag>
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
import { Area, Carta } from '@/api/types';
import PhFloppyDisk from '~icons/ph/floppy-disk';
import PhBuildings from '~icons/ph/buildings';

const areasSeleccionadas = ref<Array<Area>>([]);
const areaRsrc = useResourceApi<Area>('areas');
const cartaRsrc = useResourceApi<Area>('cartas');

const props = defineProps({
  cartaId: {
    // eslint-disable-next-line no-undef
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(['save']);
const areas = ref([]);
const carta = ref<Carta | undefined>();
const loading = ref(false);
async function initComponent() {
  if (props.cartaId) {
    loading.value = true;
    await cartaRsrc.getById(props.cartaId, { filter: { include: ['tipoCarta'] } }).then(async ({ data }) => {
      if (data) {
        carta.value = data;
        await areaRsrc.list().then(({ data }) => {
          if (data) {
            areas.value = data;
          }
        });
        await cartaRsrc.getLinks(carta.value.id, 'areas').then(({ data }) => {
          if (data) areasSeleccionadas.value = data;
        });
        loading.value = false;
      } else {
        carta.value = undefined;
      }
    });
  } else {
    carta.value = undefined;
  }
}
initComponent();
watch(() => props.cartaId, initComponent);
const onSave = async () => {
  await areasSeleccionadas.value.every((areaId) =>
    cartaRsrc.link(carta.value.id, 'areas', { relationId: areaId, link: true }).then(({ data }) => data),
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
