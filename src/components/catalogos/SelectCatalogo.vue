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
      v-for="catalogo in lista"
      :key="catalogo.id"
      :label="`${catalogo[optionLabel]}`"
      :value="catalogo[optionValue]"
    >
      <span style="float: left">{{ `${catalogo[optionLabel]}` }}</span>
      <span class="text-gray-500 ml-2" style="float: right">{{ `${catalogo.tipo}` }}</span>
    </el-option>
  </el-select>
</template>

<script setup>
import useResourceComposable from '@/composables/resource.composable';

const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: 'catalogo',
  },
  optionLabel: {
    type: String,
    default: 'nombre',
  },
  optionValue: {
    type: String,
    default: 'nombre',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultWhere: {
    type: Object,
    default: () => ({}),
  },
  tipo: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue', 'onChange']);
const { lista, getLista, where, pagination, loading } = useResourceComposable('catalogos');
pagination.value.limit = 15;
const val = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const onChange = () => {
  emit('onChange', props.modelValue);
};
const remoteMethod = (query, force = false) => {
  if (query || force) {
    where.value = {
      and: [
        { ...props.defaultWhere, tipo: props.tipo },
        {
          or: [
            {
              nombre: { like: `%${query}%`, options: 'i' },
            },
          ],
        },
      ],
    };
    getLista();
  }
};
remoteMethod('', true);
watch(
  () => props.defaultWhere,
  () => remoteMethod('', true),
);
</script>
<script>
export default {
  name: 'SelectCatalogo',
};
</script>
<style scoped></style>
