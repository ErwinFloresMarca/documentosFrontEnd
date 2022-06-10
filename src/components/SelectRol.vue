<template>
  <el-select v-model="compModel" placeholder="Rol" clearable @change="$emit('change', $event)">
    <el-option v-for="item in roles" :key="item" :label="item.toUpperCase()" :value="item"> </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectRol',
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const roles = ['admin', 'secretario', 'director', 'tecnico'];
    const compModel = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });
    return {
      roles,
      compModel,
    };
  },
};
</script>

<style lang="scss" scoped></style>
