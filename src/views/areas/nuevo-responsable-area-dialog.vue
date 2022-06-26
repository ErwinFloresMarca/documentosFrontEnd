<template>
  <el-dialog v-model="showDialog" title="ASIGNAR RESPONSABLE" width="350px" :before-close="onClose">
    <strong>Area: </strong>{{ area?.nombre }}
    <el-divider direction="horizontal" content-position="left">RESPONSABLE</el-divider>
    <select-usuario v-model="usuario" style="width: 100%" :default-where="defaultWhereUsuarios" />
    <template #footer>
      <span>
        <el-button :loading="loading" type="success" :disabled="!usuario" plain @click="onSave">GUARDAR</el-button>
        <el-button @click="onClose">Cerrar</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Area } from '@/api/types';
import useResourceApi from '@/api/resource';

export default {
  name: 'NuevoResponsableAreaDialog',
};
</script>

<script setup lang="ts">
const responsableResource = useResourceApi('responsables');
const usuario = ref<number | undefined>(undefined);
const idUsuariosAsignados = ref<number[]>([]);
const loading = ref(false);
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
const emit = defineEmits(['update:visible', 'close', 'save']);
const initComponent = () => {
  if (props.area) {
    // lista responsables
    responsableResource
      .list({
        filter: {
          where: {
            estado: { eq: true },
          },
        },
      })
      .then(({ data }) => {
        if (data) idUsuariosAsignados.value = data.map((r: any) => r.usuarioId);
      })
      .catch((err) => err);
  }
};
initComponent();
watch(() => props.area, initComponent);
const showDialog = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});
const onClose = () => {
  emit('close');
};
const onSave = () => {
  loading.value = true;
  responsableResource
    .create({
      areaId: props.area?.id,
      usuarioId: usuario.value,
    })
    .then(() => {
      loading.value = false;
      ElMessage({
        type: 'success',
        message: 'Responsable asignado',
        duration: 3000,
      });
      showDialog.value = false;
      usuario.value = undefined;
      emit('save');
    })
    .catch((err) => err);
};
const defaultWhereUsuarios = computed({
  get: () => ({
    id: { nin: idUsuariosAsignados.value },
  }),
  set: (val) => val,
});
</script>

<style lang="scss" scoped></style>
