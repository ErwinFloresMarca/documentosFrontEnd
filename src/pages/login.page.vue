<template>
  <div class="flex flex-wrap justify-center items-center align-center" style="width: 100%; height: 100vh">
    <div class="login-container">
      <img class="logo-img" src="/images/logo/logo.png" alt="LOGO" />
      <div class="login-form">
        <div class="login-title" width="100%">
          <h1 class="login-header text-white">INICIAR SESION</h1>
          <div class="btn-dark">
            <BtnDarkMode />
          </div>
        </div>
        <login-form v-model="form" :loading="loading" @on-submit="onSubmit" />
        <el-button v-if="cantUsers === 0" class="w-full" type="success" @click="$router.push({ name: 'SignUp' })"
          >REGIATRAR USUARIO</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/views/auth/login.form.vue';
import BtnDarkMode from '@/layouts/admin/header/components/btnDarkMode.vue';
import useAuth from '@/store/auth';

const form = reactive({ username: '', password: '' });
const auth = useAuth();
const router = useRouter();
const cantUsers = ref(1);
const loading = ref(false);
const updateCantUsers = async () => {
  cantUsers.value = await auth.getCantUsers();
};

updateCantUsers();

const onSubmit = async (username: string, password: string) => {
  loading.value = true;
  const successLogin = await auth.login(username, password);
  if (successLogin) {
    loading.value = false;
    ElMessage({
      type: 'success',
      message: 'Session iniciada exitosamente',
      duration: 4000,
    });
    setTimeout(() => router.push('/admin'), 500);
  } else {
    // error login
    ElMessage({
      type: 'error',
      message: 'Error al iniciar sesión revise su usuario y contraseña',
      duration: 5000,
    });
  }
};
</script>
<script lang="ts">
export default {
  name: 'LoginPage',
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  width: fit-content;
  background-color: rgb(130 22 24);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: max(100%, 520px);
  padding: 35px;
}
.login-form {
  width: 400px;
  height: fit-content;
  text-align: center;
}

.login-header {
  font-size: 30px;
  font-weight: bold;
  font-family: 'Tiny';
}
.logo-img {
  width: 250px;
  height: 250px;
}
.login-title {
  position: relative;
}
.btn-dark {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>
