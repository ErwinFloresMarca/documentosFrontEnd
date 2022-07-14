<template>
  <el-dialog v-model="showDialog" title="ASIGNAR TIPOS DE DOCUMENTOS" width="350px" :before-close="onClose">
    <strong>Area: </strong>{{ area?.nombre }}
    <el-divider direction="horizontal" content-position="left">Tipos de Documentos</el-divider>
    <el-tree
      v-loading="loading"
      :data="lista"
      node-key="id"
      :props="{ label: 'nombre' }"
      :default-checked-keys="selectedTC"
      show-checkbox
      @check="onClickTC"
    ></el-tree>
    <template #footer>
      <span>
        <el-button @click="onClose">Cerrar</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Area, ITipoDocumento } from '@/api/types';
import useResourceComposable from '@/composables/resource.composable';
import useResourceApi from '@/api/resource';

export default {
  name: 'AreaTipoDocumentoDialog',
};
</script>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  area: {
    type: Object as PropType<Area>,
    default: undefined,
  },
});
const areasApi = useResourceApi('areas');
const selectedTC = ref([]);
const { loading, lista, paginate, getLista } = useResourceComposable('tipo-documentos');
paginate.value = false;
const initComponent = () => {
  getLista();
  if (props.area) {
    areasApi
      .getLinks(props.area.id, 'tipo-documentos')
      .then(({ data }) => {
        selectedTC.value = data;
      })
      .catch((err) => err);
  } else {
    selectedTC.value = [];
  }
};
initComponent();
watch(() => props.area, initComponent);
const emit = defineEmits(['update:visible', 'close']);
const showDialog = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});
const onClose = () => {
  emit('close');
};
const onClickTC = async (tipoDocumento: ITipoDocumento) => {
  const linked = selectedTC.value.includes(tipoDocumento.id as never);
  if (props.area) {
    loading.value = true;
    await areasApi
      .link(props.area?.id, 'tipo-documentos', {
        relationId: tipoDocumento.id,
        link: !linked,
      })
      .then(({ data }) => {
        selectedTC.value = data;
        selectedTC.value = [...selectedTC.value];
        ElMessage({
          type: 'success',
          message: 'Asignación guardada',
          duration: 3000,
        });
      })
      .catch(() => {
        selectedTC.value = [...selectedTC.value];
        ElMessage({
          type: 'error',
          message: 'Error al guardar la asignación',
          duration: 3000,
        });
      });
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
