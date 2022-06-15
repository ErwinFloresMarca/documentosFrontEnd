<template>
  <el-dropdown trigger="click" placement="bottom-end" popper-class="avatar-menu">
    <div class="avatar-container flex flex-wrap justify-end items-center ml-2" @click="native">
      <div class="text-right hidden-xs-only">
        <p class="text-light-900 font-bold">{{ fullName }}</p>
        <p class="text-opacity-50 mt-1 font-bold">{{ getUser.rol.toUpperCase() }}</p>
      </div>
      <el-avatar class="ml-2" size="default" :src="fileApi.downloadUrl(getUser.avatar)">
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

<script>
import useAuth from '@/store/auth';
import useFileApi from '@/api/modules/file';

export default {
  name: 'AvatarMenu',
  setup() {
    const fileApi = useFileApi();
    const auth = useAuth();
    const router = useRouter();
    const { getUser } = auth;
    const fullName = computed({
      get: () => {
        return getUser ? `${getUser.nombres} ${getUser.paterno} ${getUser.materno}`.toUpperCase() : '';
      },
    });
    const logout = () => {
      auth.logout();
      router.push('/login');
    };
    return {
      fullName,
      getUser,
      logout,
      fileApi,
    };
  },
};
</script>

<style lang="scss">
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
