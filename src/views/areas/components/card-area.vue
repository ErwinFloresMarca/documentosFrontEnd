<template>
  <div class="area-card grid grid-cols-3 grid-rows-2" @click="onClick">
    <div class="col-span-1 row-span-2 align-middle flex flex-wrap items-center justify-center">
      <el-icon :size="40" color="var(--el-color-primary-dark-2)">
        <PhBuildings />
      </el-icon>
    </div>
    <div class="col-span-2 row-span-1 text-center">{{ area.nombre }}</div>
    <div class="col-span-1 row-span-1 text-center">
      <el-tooltip content="Documentos sin ver" raw-content>
        <span class="text-orange-400">{{ '' + cantDocumentosAsignados }}</span>
      </el-tooltip>
    </div>
    <div class="col-span-1 row-span-1 text-center">
      <el-tooltip content="Documentos pendientes" raw-content>
        <span class="text-red-400">{{ '' + cantDocumentosPendientes }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Area } from '@/api/types';
import PhBuildings from '~icons/ph/buildings';

const props = defineProps({
  area: {
    type: Object as PropType<Area>,
    required: true,
  },
});

const emit = defineEmits(['click']);
const cantDocumentosAsignados = ref<number | undefined>(undefined);
const cantDocumentosPendientes = ref<number | undefined>(undefined);
async function initComponent() {
  cantDocumentosAsignados.value = 0;
  cantDocumentosPendientes.value = 0;
}
initComponent();
const onClick = () => {
  console.log('on click area');
  emit('click');
};
</script>

<script lang="ts">
export default {
  name: 'CardArea',
};
</script>

<style lang="scss" scoped>
.area-card {
  border: 1px solid var(--el-color-primary-dark-2);
  border-radius: 7px;
  padding: 5px;
  background-color: var(--el-color-primary-light-8);
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  background-image: repeating-radial-gradient(circle at 0 0, transparent 0, var(--el-color-primary-light-7) 40px),
    repeating-linear-gradient(#00000033, #ffffff33);
}
</style>
