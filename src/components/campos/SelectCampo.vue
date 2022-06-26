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
    <el-option v-for="campo in lista" :key="campo.id" :label="`${campo[optionLabel]}`" :value="campo[optionValue]">
      <span style="float: left">{{ `${campo[optionLabel]}` }}</span>
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
    default: 'campo',
  },
  optionLabel: {
    type: String,
    default: 'nombre',
  },
  optionValue: {
    type: String,
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
});

const emit = defineEmits(['update:modelValue', 'onChange']);
const { lista, getLista, where, pagination, loading } = useResourceComposable('campos');
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
        { ...props.defaultWhere },
        {
          or: [
            {
              nombre: { like: `%${query}%`, options: 'i' },
            },
            {
              type: { like: `%${query}%`, options: 'i' },
            },
            {
              tipoCatalogo: { like: `%${query}%`, options: 'i' },
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
  name: 'SelectCampo',
};
</script>
<style scoped></style>
