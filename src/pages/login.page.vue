<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-header">INICIAR SESION</h1>
      <login-form v-model="form" @on-submit="onSubmit" />
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/views/auth/login.form.vue';
import useAuth from '@/store/auth';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  setup() {
    const form = reactive({ username: '', password: '' });
    const auth = useAuth();
    const router = useRouter();
    const onSubmit = async (username, password) => {
      const successLogin = await auth.login(username, password);
      if (successLogin) {
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        // error login
        console.log('error login!!!');
      }
    };
    return {
      form,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.login-form {
  width: 400px;
  height: fit-content;
  text-align: center;
}

.login-header {
  font-size: 45px;
  font-weight: bold;
  color: var(--prism-foreground);
}
</style>
