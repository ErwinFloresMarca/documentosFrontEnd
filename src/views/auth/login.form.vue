<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="0px" :inline="false" size="default">
      <el-form-item>
        <el-input v-model="form.username" class="input-text" name="usuario" :placeholder="t('username')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          class="input-text"
          name="password"
          type="password"
          show-password
          :placeholder="t('password')"
          @keydown.enter="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- TODO: globalizar -->
        <el-button type="primary" size="large" @click="onSubmit">Iniciar Sesión</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
interface Props {
  modelValue: { username?: string; password?: string };
}
export default {
  name: 'LoginForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'on-submit'],
  setup(props: Props, { emit }: any) {
    const { t } = useI18n();
    const rules = reactive({});
    const form = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        emit('update:modelValue', newVal);
      },
    });
    const onSubmit = () => {
      emit('on-submit', form.value.username, form.value.password);
    };
    return {
      rules,
      form,
      onSubmit,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
}
.input-text {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 7px;
}
</style>
