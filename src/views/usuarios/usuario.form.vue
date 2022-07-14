<template>
  <div class="flex flex-col justify-between" style="height: 100%">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top" label-width="80px" :inline="false">
      <el-space fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-upload
              class="avatar-uploader flex flex-wrap justify-center items-center h-full"
              :action="fileApi.createUrl()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="data.avatar" :src="fileApi.downloadUrl(data.avatar)" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-col>
          <el-col :span="14" :offset="0">
            <el-form-item label="C.I." prop="ci">
              <el-input v-model="data.ci" placeholder="ci" />
            </el-form-item>
            <el-form-item label="Celular" prop="celular">
              <el-input v-model="data.celular" placeholder="celular" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
      <el-space fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="noRol ? 24 : 16" :offset="0">
            <el-form-item label="Usuario" prop="usuario">
              <el-input v-model="data.usuario" placeholder="Usuario" />
            </el-form-item>
          </el-col>
          <el-col v-if="!noRol" :span="8" :offset="0">
            <el-form-item label="Rol" prop="rol">
              <select-rol v-model="data.rol" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
      <el-form-item label="Nombres" prop="nombres">
        <el-input v-model="data.nombres" placeholder="Nombres" />
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
      <el-form-item label="Correo electrónico" prop="email">
        <el-input v-model="data.email" placeholder="correo electronico" />
      </el-form-item>
      <el-space v-if="!selected" fill style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="Contraseña" prop="password">
              <el-input v-model="data.password" type="password" show-password placeholder="contraseña" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Repita la contraseña" prop="passwordConfirm">
              <el-input v-model="data.passwordConfirm" type="password" show-password placeholder="contraseña" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-space>
    </el-form>
    <el-space fill style="width: 100%">
      <el-row :gutter="10">
        <el-col :span="12" :offset="0">
          <el-button :loading="loading" style="width: 100%" :icon="PhFloppyDisk" type="primary" @click="onSave"
            >GUARDAR</el-button
          >
        </el-col>
        <el-col :span="12" :offset="0">
          <el-button :loading="loading" style="width: 100%" :icon="Close" type="danger" @click="onCancel"
            >CANCELAR</el-button
          >
        </el-col>
      </el-row>
    </el-space>
  </div>
</template>

<script>
import { Close, Plus } from '@element-plus/icons-vue';
import PhFloppyDisk from '~icons/ph/floppy-disk';
import useFileApi from '@/api/modules/file';

export default {
  name: 'UsuarioForm',
  components: { Plus },
  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Object,
      default: undefined,
    },
    noRol: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['save', 'cancel', 'update:errors'],
  setup(props, { emit }) {
    const fileApi = useFileApi();
    const formRef = ref(undefined);
    const data = ref({});
    function initComp() {
      if (props.noRol) {
        data.rol = 'admin';
      }
    }
    initComp();
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
          validator: (rule, value, callback) => {
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
    const rules = computed({
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
      formRef.value.validate((valid) => {
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
        formRef.value?.resetFields([
          'avatar',
          'ci',
          'celular',
          'usuario',
          'rol',
          'nombres',
          'paterno',
          'materno',
          'email',
        ]);
        initComp();
      }
    };
    const onCancel = () => {
      resetValues();
      emit('cancel');
    };
    const handleAvatarSuccess = (resp) => {
      data.value.avatar = resp.files[0].fileName;
    };
    return {
      formRef,
      data,
      rules,
      lErrors,
      onSave,
      onCancel,
      resetValues,
      fileApi,
      handleAvatarSuccess,
      // icons
      Close,
      PhFloppyDisk,
    };
  },
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

  border-radius: 13px;
  /* background: #e0e0e0; */
  box-shadow: 8px 8px 12px #00000055, -8px -8px 12px #ffffff55;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  font-weight: 900;
  width: 130px;
  height: 130px;
  text-align: center;
  /* background-color: #fff; */
}
</style>
