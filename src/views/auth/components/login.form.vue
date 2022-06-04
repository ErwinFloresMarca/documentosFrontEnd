<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="0px" :inline="false" size="default">
      <el-form-item :inline="false">
        <el-input v-model="form.username" :placeholder="t('username')"></el-input>
      </el-form-item>
      <el-form-item :inline="false">
        <el-input v-model="form.password" type="password" show-password :placeholder="t('password')"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- TODO: globalizar -->
        <el-button type="primary" @click="onSubmit">Iniciar Sesión</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onCancel">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props: any, ctx: any) {
    const { t } = useI18n();
    const rules = reactive({});
    const form = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        ctx.emit('update:modelValue', newVal);
      },
    });
    const router = useRouter();
    const onCancel = () => {
      router.go(-1);
    };
    return {
      rules,
      form,
      onCancel,
      t,
    };
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
}
</style>
