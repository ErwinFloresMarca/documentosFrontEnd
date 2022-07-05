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
        <login-form v-model="form" @on-submit="onSubmit" />
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
const onSubmit = async (username: string, password: string) => {
  const successLogin = await auth.login(username, password);
  if (successLogin) {
    setTimeout(() => router.push('/admin'), 1000);
  } else {
    // error login
    console.log('error login!!!');
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
  height: 100vh;
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
