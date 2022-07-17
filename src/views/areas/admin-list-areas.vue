<template>
  <div class="admin-areas-container">
    <template v-if="!emptyList">
      <CardArea v-for="area in lista" :key="area.id" :area="area" @click="onClickArea" />
    </template>
    <template v-else>
      <div class="text-center w-full">No existe areas registradas</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Area } from '@/api/types';
import useResourceComposable from '@/composables/resource.composable';
import CardArea from './components/card-area.vue';

const emit = defineEmits(['on-select-one']);

const { lista, paginate, include, getLista } = useResourceComposable<Area>('areas');
include.value = undefined;
paginate.value = false;
getLista();
const emptyList = computed<boolean>({
  get: () => lista.value?.length === 0,
  set: (val) => val,
});

function onClickArea(a: Area) {
  emit('on-select-one', a);
}
</script>

<script lang="ts">
export default {
  name: 'AdminListAreas',
};
</script>

<style lang="scss" scoped>
.admin-areas-container {
  display: -ms-grid;
  display: grid;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-columns: auto;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
}
</style>
