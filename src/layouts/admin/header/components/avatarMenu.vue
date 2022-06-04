<template>
  <el-dropdown trigger="click" placement="bottom-end" popper-class="avatar-menu">
    <div class="avatar-container flex flex-wrap justify-end items-center ml-2" @click="native">
      <div class="text-right">
        <strong class="text-light-900">{{ fullName }}</strong> <br />
        <strong class="text-opacity-50">{{ getUser.role }}</strong>
      </div>
      <el-avatar class="ml-2" size="default" :src="getUser.avatar">
        <img src="/images/avatar/circle.png" />
      </el-avatar>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Perfil</el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span class="bg-red-600 text-light-50 p-1 pb-0 rounded-md mr-2"><i-ph-sign-in-bold /></span> Cerrar Sesión
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import useAuth from '@/store/auth';

export default {
  name: 'AvatarMenu',
  setup() {
    const auth = useAuth();
    const router = useRouter();
    const { getUser } = auth;
    const fullName = computed({
      get: () => (getUser ? `${getUser.nombres} ${getUser.paterno} ${getUser.materno}`.toUpperCase() : ''),
    });
    const logout = () => {
      auth.logout();
      router.push('/login');
    };
    return {
      fullName,
      getUser,
      logout,
    };
  },
};
</script>
<style>
.avatar-menu {
  .el-popper__arrow {
    left: auto !important;
    right: 4.8px !important;
  }
}
</style>

<style lang="scss" scoped>
.avatar-container {
  max-width: 500px;
  width: fit-content;
  cursor: pointer;
}
</style>
