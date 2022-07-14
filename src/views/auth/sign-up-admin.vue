<template>
  <div class="sign-up-container">
    <UsuarioForm
      v-model:errors="errors"
      class="usuario-form"
      no-rol
      :loading="loading"
      @save="onSave"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import UsuarioForm from '@/views/usuarios/usuario.form.vue';
import { Usuario } from '@/api/types';
import useUserApi from '@/api/modules/user';

const emit = defineEmits(['success', 'cancel']);

const errors = ref({});

const userRsrc = useUserApi();
const loading = ref(false);

const onSave = async (userData: Partial<Usuario & { password: string; passwordConfirm: string }>) => {
  loading.value = true;
  await userRsrc
    .createAdmin({ ...userData, passwordConfirm: undefined })
    .then((resp) => {
      if (resp.data) {
        // eslint-disable-next-line no-undef
        ElNotification({
          title: 'Exito!',
          message: 'Usuario creado.',
          type: 'success',
          duration: 3000,
        });
        loading.value = false;
        emit('success', { username: userData.usuario, password: userData.password });
      }
    })
    .catch(() => {
      loading.value = false;
    });
};
const onCancel = () => {
  emit('cancel');
};
</script>

<script lang="ts">
export default {
  name: 'SignUpAdmin',
};
</script>

<style lang="scss" scoped>
.sign-up-container {
}

:deep(.usuario-form) {
  .el-form-item__error {
    font-weight: bold;
    text-shadow: rgb(0, 0, 0) 0px 0px 10px;
    --darkreader-inline-color: #e8e6e3;
    --darkreader-inline-bgimage: initial;
  }
  .el-form-item__label {
    color: white;
  }
  .el-input {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 7px;
  }
}
</style>
