<template>
  <el-dialog v-model="showDialog" title="ASIGNAR CAMPOS" width="350px" :before-close="onClose">
    <strong>Tipo de carta: </strong>{{ tipoCarta?.nombre }}
    <el-divider direction="horizontal" content-position="left">Campos</el-divider>
    <el-scrollbar height="200px">
      <el-tree
        v-loading="loading"
        :data="lista"
        node-key="id"
        :props="{ label: 'nombre' }"
        :default-checked-keys="selectedTC"
        show-checkbox
        @check="onClickTC"
      ></el-tree>
    </el-scrollbar>
    <template #footer>
      <span>
        <el-button @click="onClose">Cerrar</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { ICampo, TipoCarta } from '@/api/types';
import useResourceComposable from '@/composables/resource.composable';
import useResourceApi from '@/api/resource';

export default {
  name: 'TipoCartaCampoDialog',
};
</script>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  tipoCarta: {
    type: Object as PropType<TipoCarta>,
    default: undefined,
  },
});
const tipoCartasApi = useResourceApi('tipo-cartas');
const selectedTC = ref([]);
const { loading, lista, paginate, getLista } = useResourceComposable('campos');
paginate.value = false;
const initComponent = () => {
  if (props.tipoCarta) {
    getLista();
    tipoCartasApi
      .getLinks(props.tipoCarta.id, 'campos')
      .then(({ data }) => {
        selectedTC.value = data;
      })
      .catch((err) => err);
  } else {
    selectedTC.value = [];
  }
};
initComponent();
watch(() => props.tipoCarta, initComponent);
const emit = defineEmits(['update:visible', 'close']);
const showDialog = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});
const onClose = () => {
  emit('close');
};
const onClickTC = async (tipoCarta: ICampo) => {
  const linked = selectedTC.value.includes(tipoCarta.id as never);
  if (props.tipoCarta) {
    loading.value = true;
    await tipoCartasApi
      .link(props.tipoCarta?.id, 'campos', {
        relationId: tipoCarta.id,
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
