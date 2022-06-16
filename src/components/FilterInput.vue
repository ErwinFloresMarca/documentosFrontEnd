<template>
  <slot :filter="filter"> </slot>
</template>

<script>
export default {
  name: 'FilterInput',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    operator: {
      type: String,
      default: 'like',
    },
    firstValue: {
      type: [String, Object, Number, Boolean],
      default: '',
    },
    options: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputVal = ref(props.firstValue);
    const filter = reactive({
      value: computed({
        get: () => inputVal.value,
        set: (val) => {
          inputVal.value = val;
          if (props.operator === 'equals') {
            emit('update:modelValue', val === false ? false : val || undefined);
            return;
          }
          if (val === null) {
            emit('update:modelValue', undefined);
            return;
          }
          const obj = {};
          obj[props.operator] = props.operator === 'like' ? `%${val}%` : val;
          if (props.options) {
            obj.options = props.options;
          }
          emit('update:modelValue', obj);
        },
      }),
    });
    return {
      filter,
    };
  },
};
</script>

<style lang="scss" scoped></style>
