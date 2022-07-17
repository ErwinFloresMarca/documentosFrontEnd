<template>
  <div class="admin-tipo-documentos-container">
    <template v-if="!emptyList">
      <CardTipoDocumento
        v-for="tipoDocumento in lista"
        :key="tipoDocumento.id"
        :tipo-documento="tipoDocumento"
        :area="area"
        @click="onClickTipoDocumento"
      />
    </template>
    <template v-else>
      <div class="text-center w-full">No existe tipos de documento registradas</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Area, TipoDocumento } from '@/api/types';
import useResourceComposable from '@/composables/resource.composable';
import CardTipoDocumento from './components/card-tipo-documento.vue';

const props = defineProps({
  area: {
    type: Object as PropType<Area>,
    required: true,
  },
});

const emit = defineEmits(['on-select-one']);

const { lista, paginate, include, getLista } = useResourceComposable<TipoDocumento>('tipo-documentos');
include.value = undefined;
paginate.value = false;
getLista();
const emptyList = computed<boolean>({
  get: () => lista.value?.length === 0,
  set: (val) => val,
});

function onClickTipoDocumento(a: TipoDocumento) {
  emit('on-select-one', a);
}
</script>

<script lang="ts">
export default {
  name: 'AdminListTipoDocumentos',
};
</script>

<style lang="scss" scoped>
.admin-tipo-documentos-container {
  display: -ms-grid;
  display: grid;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-columns: auto;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
}
</style>
