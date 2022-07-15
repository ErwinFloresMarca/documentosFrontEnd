<template>
  <div class="admin-areas-container">
    <template v-if="!emptyList">
      <CardArea v-for="area in lista" :key="area.id" :area="area" />
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

const { lista, paginate, include, getLista } = useResourceComposable<Area>('areas');
include.value = undefined;
paginate.value = false;
getLista();
const emptyList = computed({
  get: () => lista.value?.length === 0,
});
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
