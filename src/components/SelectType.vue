<template>
  <el-select v-model="compModel" :placeholder="placeholder" clearable @change="$emit('change', $event)">
    <el-option v-for="item in data" :key="item.key" :label="item.label.toUpperCase()" :value="item.key"> </el-option>
  </el-select>
</template>

<script>
import tiposDeCampos from '@/utils/camposType';

export default {
  name: 'SelectType',
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Tipo de campo',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const data = tiposDeCampos;
    const compModel = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });
    return {
      data,
      compModel,
    };
  },
};
</script>

<style lang="scss" scoped></style>
