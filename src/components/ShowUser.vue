<template>
  <div class="user-container flex flex-wrap">
    <el-avatar
      :icon="Avatar"
      size="small"
      shape="circle"
      :src="fileApi.downloadUrl(usuario.avatar)"
      fit="fill"
    ></el-avatar>
    <p class="ml-2">{{ usuario.usuario }}</p>
  </div>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue';
import useFileApi from '@/api/modules/file';

export default {
  name: 'ShowUser',
  props: {
    usuario: {
      type: Object,
      default: undefined,
    },
  },
  setup() {
    const fileApi = useFileApi();
    return {
      fileApi,
      Avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.usuario-container {
  width: fit-content;
}
</style>
