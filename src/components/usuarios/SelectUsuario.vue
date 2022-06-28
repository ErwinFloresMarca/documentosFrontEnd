<template>
  <el-select
    v-model="val"
    :loading="loading"
    value-key="id"
    placeholder="Usuarios"
    clearable
    filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod"
    :multiple="multiple"
    @change="onChange"
  >
    <el-option
      v-for="usuario in lista"
      :key="usuario.id"
      :label="`${usuario.nombres} ${usuario.paterno} ${usuario.materno}`"
      :value="usuario.id"
    >
      <span style="float: left">{{ `${usuario.nombres} ${usuario.paterno} ${usuario.materno}` }}</span>
      <span class="text-gray-500 ml-2" style="float: right">{{ `${usuario.rol}` }}</span>
    </el-option>
  </el-select>
</template>

<script setup>
import useResourceComposable from '@/composables/resource.composable';

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
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
const { lista, getLista, where, pagination, loading } = useResourceComposable('usuarios');
pagination.value.limit = 15;
getLista();
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
        { ...props.defaultWhere, estado: true },
        {
          or: [
            {
              nombres: { like: `%${query}%`, options: 'i' },
            },
            {
              usuario: { like: `%${query}%`, options: 'i' },
            },
            {
              paterno: { like: `%${query}%`, options: 'i' },
            },
            {
              materno: { like: `%${query}%`, options: 'i' },
            },
            {
              ci: { like: `%${query}%`, options: 'i' },
            },
            {
              rol: { like: `%${query}%`, options: 'i' },
            },
          ],
        },
      ],
    };
    getLista();
  }
};

watch(
  () => props.defaultWhere,
  () => remoteMethod('', true),
);
</script>
<script>
export default {
  name: 'SelectUsuario',
};
</script>
<style scoped></style>
