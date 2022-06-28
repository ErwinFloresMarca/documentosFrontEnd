<template>
  <el-dialog v-model="showDialog" :title="header" width="350px" :before-close="onCancel">
    <el-form
      ref="formRef"
      :model="data"
      :rules="rules"
      label-position="top"
      label-width="80px"
      :inline="false"
      style="width: 100%"
    >
      <el-form-item v-if="!defaultTipo" label="Tipo" prop="tipo">
        <select-campo
          v-model="data.tipo"
          placeholder="tipo de catalogo"
          option-label="tipoCatalogo"
          option-value="tipoCatalogo"
          :default-where="defaultWhereTipos"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="data.nombre" placeholder="Nombre" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row :gutter="5">
        <el-col :span="12" :offset="0">
          <el-button style="width: 100%" :icon="PhFloppyDisk" type="primary" @click="onSave">GUARDAR</el-button>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-button style="width: 100%" :icon="Close" type="danger" @click="onCancel">CANCELAR</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import PhFloppyDisk from '~icons/ph/floppy-disk';
import { ComodinObject } from '@/types';
import { Catalogo } from '@/api/types';

const props = defineProps({
  errors: {
    type: Object,
    default: () => ({}),
  },
  selected: {
    type: Object as PropType<Catalogo>,
    default: undefined,
  },
  defaultTipo: {
    type: String,
    default: undefined,
  },
  header: {
    type: String,
    default: 'NUEVO CATALOGO',
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['save', 'cancel', 'update:errors', 'update:errors', 'update:visible']);
const formRef = ref<ComodinObject | undefined>(undefined);
const data = ref<Partial<Catalogo>>({});
const copySelected = () => {
  if (props.selected) data.value = { ...props.selected };
  else data.value = {};
  if (props.defaultTipo) data.value.tipo = props.defaultTipo;
};
copySelected();
watch(() => [props.selected, props.defaultTipo], copySelected);
const defaultRules = {
  tipo: [{ required: true, message: 'Introduzca el tipo.', trigger: 'blur' }],
  nombre: [
    { required: true, message: 'Introduzca un nombre.', trigger: 'blur' },
    { min: 3, max: 30, message: 'El nombre es muy corto o largo.', trigger: 'blur' },
  ],
};
const rules = computed<object>({
  get: () => {
    return defaultRules;
  },
  set: (newValue) => newValue,
});
const showDialog = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});
const onSave = () => {
  if (props.defaultTipo) data.value.tipo = props.defaultTipo;
  if (!formRef.value) return;
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('save', data.value);
      return true;
    }
    return false;
  });
};
const resetValues = () => {
  data.value = {};
  if (formRef.value) {
    formRef.value?.resetFields(['']);
  }
};
const onCancel = () => {
  resetValues();
  emit('cancel');
};
const defaultWhereTipos = computed({
  get: () => ({
    conCatalogo: { eq: true },
  }),
  set: (value) => value,
});
defineExpose({
  resetValues,
});
</script>

<script lang="ts">
export default {
  name: 'CatalogoDialogForm',
};
</script>

<style lang="scss" scoped></style>
