<template>
  <div class="flex flex-col justify-between" style="width: 100%; height: 100%">
    <el-form
      ref="formRef"
      :model="data"
      :rules="rules"
      label-position="top"
      label-width="80px"
      :inline="false"
      style="width: 100%"
    >
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="data.nombre" placeholder="Nombre" />
      </el-form-item>
      <el-form-item label="Nombre de Campo" prop="label">
        <el-input v-model="data.label" placeholder="Nombre de campo" />
      </el-form-item>
      <el-form-item label="Descripción" prop="placeholder">
        <el-input v-model="data.placeholder" placeholder="Descripción" />
      </el-form-item>
      <el-form-item label="Tipo" prop="type">
        <SelectType v-model="data.type" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Identificador" prop="key">
        <el-input v-model="data.key" placeholder="Identificador" />
      </el-form-item>
      <el-form-item label="Catalogo" prop="conCatalogo">
        <el-space fill style="width: 100%">
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-switch
                v-model="data.conCatalogo"
                :active-value="true"
                :inactive-value="false"
                active-text="SI"
                inactive-text="NO"
              />
            </el-col>
            <el-col :span="16" :offset="0">
              <el-input v-if="data.conCatalogo" v-model="data.tipoCatalogo" placeholder="identificadorCatalogo" />
            </el-col>
          </el-row>
        </el-space>
      </el-form-item>
      <el-form-item label="Obligatorio" prop="required">
        <el-switch
          v-model="data.required"
          :active-value="true"
          :inactive-value="false"
          active-text="SI"
          inactive-text="NO"
        />
      </el-form-item>
    </el-form>
    <el-space fill style="width: 100%; height: 40px">
      <el-row :gutter="10">
        <el-col :span="12" :offset="0">
          <el-button style="width: 100%" :icon="PhFloppyDisk" type="primary" @click="onSave">GUARDAR</el-button>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-button style="width: 100%" :icon="Close" type="danger" @click="onCancel">CANCELAR</el-button>
        </el-col>
      </el-row>
    </el-space>
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
import { Close } from '@element-plus/icons-vue';
import PhFloppyDisk from '~icons/ph/floppy-disk';
import { ComodinObject } from '@/types';

interface Props {
  selected?: object;
  errors?: object;
}
export default {
  name: 'CampoForm',
  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['save', 'cancel', 'update:errors'],
  setup(props: Props, { emit }: SetupContext) {
    const formRef = ref<ComodinObject | undefined>(undefined);
    const data = ref<{
      [key: string]: string;
    }>({});
    const copySelected = () => {
      if (props.selected) data.value = { ...props.selected };
      else data.value = {};
    };
    copySelected();
    watch(() => props.selected, copySelected);
    const defaultRules = {
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
    const lErrors = computed({
      get: () => props.errors,
      set: (newValue) => emit('update:errors', newValue),
    });
    const onSave = () => {
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
    return {
      formRef,
      data,
      rules,
      lErrors,
      onSave,
      onCancel,
      resetValues,
      // icons
      Close,
      PhFloppyDisk,
    };
  },
};
</script>

<style lang="scss" scoped></style>
