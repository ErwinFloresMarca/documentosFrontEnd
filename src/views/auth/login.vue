<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-header">INICIAR SESION</h1>
      <LoginForm v-model="form" />
    </div>
  </div>
</template>

<script>
import LoginForm from './components/login.form.vue';

export default {
  name: 'LoginComponent',
  components: { LoginForm },
  setup() {
    const form = reactive({ username: '', password: '' });
    return {
      form,
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
