<template>
  <el-select
    v-model="val"
    :loading="loading"
    :value-key="optionValue"
    :placeholder="placeholder"
    clearable
    filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod"
    :multiple="multiple"
    @change="onChange"
  >
    <el-option
      v-for="tipoDocumento in lista"
      :key="tipoDocumento.id"
      :label="`${optionLabel === 'nombre' ? tipoDocumento.nombre : tipoDocumento.id}`"
      :value="optionValue === 'nombre' ? tipoDocumento.nombre : tipoDocumento.id"
    >
      <span style="float: left">{{ `${optionLabel === 'nombre' ? tipoDocumento.nombre : tipoDocumento.id}` }}</span>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import useResourceComposable from '@/composables/resource.composable';
import { TipoDocumento } from '@/api/types';

const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: 'campo',
  },
  optionLabel: {
    type: String,
    validator(value: string) {
      // The value must match one of these strings
      return ['nombre', 'id'].includes(value);
    },
    default: 'nombre',
  },
  optionValue: {
    type: String,
    validator(value: string) {
      // The value must match one of these strings
      return ['nombre', 'id'].includes(value);
    },
    default: 'id',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultWhere: {
    type: Object,
    default: () => ({}),
  },
  limit: {
    type: Number,
    default: 15,
  },
});

const emit = defineEmits(['update:modelValue', 'onChange']);
const { lista, getLista, where, pagination, loading } = useResourceComposable<TipoDocumento>('tipo-documentos');
const val = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const onChange = () => {
  emit('onChange', props.modelValue);
};
const remoteMethod = (query: string | undefined, force = false) => {
  if (query || force) {
    where.value = {
      and: [
        { ...props.defaultWhere },
        {
          or: [
            {
              nombre: { like: `%${query}%`, options: 'i' },
            },
          ],
        },
      ],
    };
    pagination.value.limit = props.limit;
    getLista();
  }
};
remoteMethod('', true);
watch(
  () => props.defaultWhere,
  () => remoteMethod('', true),
);
</script>
<script lang="ts">
export default {
  name: 'SelectTipoDocumento',
};
</script>
<style scoped></style>
