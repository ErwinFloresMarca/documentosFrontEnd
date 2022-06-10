<template>
  <div class="flex flex-wrap flex-row justify-between" style="height: 100%">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top" label-width="80px" :inline="false">
      <el-space fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="16" :offset="0">
            <el-form-item label="Usuario" prop="usuario">
              <el-input v-model="data.usuario" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label="Rol" prop="rol">
              <select-rol v-model="data.rol" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
      <el-form-item label="Nombres" prop="nombres">
        <el-input v-model="data.nombres" />
      </el-form-item>
      <el-space fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="Apellido paterno" prop="paterno">
              <el-input v-model="data.paterno" placeholder="Apellido paterno" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Apellido materno" prop="materno">
              <el-input v-model="data.materno" placeholder="Apellido Materno" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
      <el-space fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="C.I." prop="ci">
              <el-input v-model="data.ci" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Celular" prop="celular">
              <el-input v-model="data.celular" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
      <el-form-item label="Correo electrónico" prop="email">
        <el-input v-model="data.email" />
      </el-form-item>
      <el-space v-if="!selected" fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="Contraseña" prop="password">
              <el-input v-model="data.password" type="password" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Repita la contraseña" prop="passwordConfirm">
              <el-input v-model="data.passwordConfirm" type="password" show-password />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
    </el-form>
    <el-space fill style="width: 100%">
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

interface Props {
  selected?: object;
  errors?: object;
}
export default {
  name: 'UsuarioForm',
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
    const formRef = ref<any>(undefined);
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
      usuario: [
        { required: true, message: 'Introduzca un usuario.', trigger: 'blur' },
        { min: 8, max: 15, message: 'El usuario debe tener entre 8 y 15 caracteres.', trigger: 'blur' },
      ],
      nombres: [
        { required: true, message: 'Introduzca su nombre(s).', trigger: 'blur' },
        { min: 3, max: 30, message: 'El nombre es muy corto o largo.', trigger: 'blur' },
      ],
      materno: [
        { required: true, message: 'Introduzca su apellido materno.', trigger: 'blur' },
        { min: 3, max: 15, message: 'El apellido es muy corto o largo.', trigger: 'blur' },
      ],
      rol: [{ required: true, message: 'Por favor seleccione un rol.', trigger: 'change' }],
      ci: [{ required: true, message: 'Introduzca un c.i.', trigger: 'blur' }],
    };
    const onNewRules = {
      password: [
        { required: true, message: 'Introduzca una contraseña', trigger: 'blur' },
        { min: 8, max: 24, message: 'la contraseña es muy corta.', trigger: 'blur' },
      ],
      passwordConfirm: [
        {
          validator: (rule: string, value: string, callback: (error?: Error) => void) => {
            if (data.value.password) {
              if (value !== data.value.password) {
                callback(new Error('No es igual que la contraseña.'));
                return;
              }
            }
            callback();
          },
          trigger: 'blur',
        },
      ],
    };
    const rules = computed<object>({
      get: () => {
        const joinRules = {
          ...defaultRules,
        };
        if (!props.selected) Object.assign(joinRules, onNewRules);
        return joinRules;
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
      if (formRef.value) {
        formRef.value.resetFields();
        setTimeout(() => formRef.value.resetFields(), 500);
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
