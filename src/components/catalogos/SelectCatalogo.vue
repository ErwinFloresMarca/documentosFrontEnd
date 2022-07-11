<template>
  <div class="w-full">
    <catalogo-dialog-form
      ref="formRef"
      v-model:visible="showDialog"
      v-model:errors="errors"
      :default-tipo="tipo"
      :header="unCamelCase(tipo)"
      @save="onSaveCatalogo"
      @cancel="onCancel"
    />
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
      style="width: 100%"
      @change="onChange"
      @blur="onBlur"
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
      <template #empty>
        <el-button type="primary" :icon="Plus" size="default" style="width: 100%" @click="onAddCatalogo"
          >NUEVO</el-button
        >
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import CatalogoDialogForm from '@/views/catalogos/catalogo-dialog-form.vue';
import { unCamelCase } from '@/utils/format';

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

const emit = defineEmits(['update:modelValue', 'onChange', 'blur']);
const { lista, getLista, where, pagination, loading, include, create } = useResourceComposable('catalogos');
include.value = undefined;
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
// dialog nuevo catalogo
const formRef = ref();
const errors = ref({});
const cleanForm = () => {
  errors.value = {};
  if (formRef.value) formRef.value.resetValues();
};
const showDialog = ref(false);
const onAddCatalogo = () => {
  showDialog.value = true;
};

const onSaveCatalogo = async (data) => {
  const cat = await create(data);
  showDialog.value = false;
  if (cat) {
    val.value = cat.nombre;
    cleanForm();
  }
};
const onCancel = () => {
  cleanForm();
  showDialog.value = false;
};

watch(
  () => props.defaultWhere,
  () => remoteMethod('', true),
);
const onBlur = (ev) => {
  emit('blur', ev);
};
</script>
<script>
export default {
  name: 'SelectCatalogo',
};
</script>
<style scoped></style>
