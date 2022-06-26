<template>
  <div v-if="usuario" class="user-container flex items-center">
    <el-avatar
      :icon="Avatar"
      shape="circle"
      :src="fileApi.downloadUrl(usuario.avatar || 'noExist')"
      fit="fill"
    ></el-avatar>
    <div class="text-left" style="width: 100px">
      <p class="ml-2">{{ usuario.usuario }}</p>
      <p class="ml-2 uppercase font-bold">{{ usuario.rol }}</p>
    </div>
    <div class="options-container pl-2"><slot name="options"></slot></div>
  </div>
  <div v-else>
    <slot name="empty">
      <span>{{ emptyText }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Avatar } from '@element-plus/icons-vue';
import useFileApi from '@/api/modules/file';
import { Usuario } from '@/api/types';

const props = defineProps({
  usuario: {
    type: Object as PropType<Usuario>,
    default: undefined,
  },
  emptyText: {
    type: String,
    default: 'Sin Usuario',
  },
});
const fileApi = useFileApi();
</script>

<script lang="ts">
export default {
  name: 'ShowUser',
};
</script>

<style lang="scss" scoped>
.usuario-container {
  width: fit-content;
}
.options-container {
  height: fit-content;
}
</style>
