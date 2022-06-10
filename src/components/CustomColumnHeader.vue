<template>
  <div v-if="scope.$index === 0" class="flex flex-wrap justify-center align-middle">
    <slot name="header"></slot>
  </div>
  <div v-else style="padding: 5px">
    <slot>
      {{ scope.row[prop] }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CustomColumnHeader',
  props: {
    scope: {
      type: Object,
      default: () => ({}),
    },
    prop: {
      type: String,
      default: 'id',
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
