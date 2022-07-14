<template>
  <div class="flex flex-wrap justify-center items-center align-center" style="width: 100%; height: 100vh">
    <div class="sign-up-container">
      <h3>REGISTRAR USUARIO ADMINISTRADOR</h3>
      <sign-up-admin @success="onSuccess" @cancel="$router.push({ name: 'Login' })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SignUpAdmin from '@/views/auth/sign-up-admin.vue';
import useAuth from '@/store/auth';

const auth = useAuth();
const router = useRouter();
const onSuccess = async ({ username, password }: { username: string; password: string }) => {
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
.sign-up-container {
  display: flex;
  width: min(100%, 470px);
  background-color: rgb(130 22 24);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: max(100%, 680px);
  padding: 10px;
}
</style>
