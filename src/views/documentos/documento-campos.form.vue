<template>
  <el-space fill style="width: 100%">
    <div v-loading="loading" class="grid grid-custom">
      <div v-for="campo in campos" :key="campo.id">
        <el-form-item :label="campo.label" :prop="`campos.${campo.key}`">
          <template v-if="campo.conCatalogo">
            <select-catalogo
              v-model="dataCampos[campo.key]"
              :placeholder="campo.placeholder"
              :tipo="campo.tipoCatalogo"
            />
          </template>
          <template v-else>
            <el-input
              v-if="campo.type == camposInputTypes.string"
              v-model="dataCampos[campo.key]"
              :placeholder="campo.placeholder"
              clearable
              style="width: 100%"
            ></el-input>
            <el-input-number
              v-else-if="campo.type == camposInputTypes.number"
              v-model="dataCampos[campo.key]"
              :placeholder="campo.placeholder"
              clearable
              style="width: 100%"
            ></el-input-number>
            <el-switch
              v-else-if="campo.type == camposInputTypes.boolean"
              v-model="dataCampos[campo.key]"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
            <el-input
              v-else-if="campo.type == camposInputTypes.textarea"
              v-model="dataCampos[campo.key]"
              :placeholder="campo.placeholder"
              type="textarea"
              :rows="3"
              :autosize="{ minRows: 2, maxRows: 4 }"
              style="width: 100%"
            >
            </el-input>
            <el-date-picker
              v-else-if="campo.type == camposInputTypes.date"
              v-model="dataCampos[campo.key]"
              class="custom-date-picker"
              :placeholder="campo.placeholder"
              value-format="YYYY/MM/DD"
              format="YYYY/MM/DD"
            >
            </el-date-picker>
            <el-date-picker
              v-else-if="campo.type == camposInputTypes.datetime"
              v-model="dataCampos[campo.key]"
              class="custom-date-picker"
              :placeholder="campo.placeholder"
              type="datetime"
              value-format="YYYY/MM/DD HH:mm:ss"
              format="YYYY/MM/DD HH:mm:ss"
            >
            </el-date-picker>
          </template>
        </el-form-item>
      </div>
    </div>
  </el-space>
</template>

<script setup lang="ts">
import { Campo } from '@/api/types';
import useResourceApi from '@/api/resource';
import { camposInputTypes } from '@/utils/camposType';
import { ComodinObject } from '@/types';

const props = defineProps({
  tipoDocumentoId: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'onChange', 'update:rules']);
const loading = ref(false);
const campos = ref<Array<Campo>>([]);
const compRules = computed({
  get: () => props.rules,
  set: (newVal) => emit('update:rules', newVal),
});
const dataCampos = reactive({ ...props.modelValue });
const cleanDataCampos = () => {
  Object.keys(dataCampos).forEach((key) => {
    dataCampos[key] = undefined;
  });
};
const copyToDataCampos = (data: ComodinObject) => {
  Object.assign(dataCampos, data);
};

function initComponent() {
  loading.value = true;
  const tipoDocumentoCamposRsrc = useResourceApi(`tipo-documentos/${props.tipoDocumentoId}/campos`);
  tipoDocumentoCamposRsrc
    .list()
    .then(({ data }: { data: Array<Campo> }) => {
      campos.value = data;
      loading.value = false;
      campos.value.forEach((camp: Campo) => {
        if (camp.type === 'boolean') {
          dataCampos[camp.key] = false;
        }
        compRules.value[`campos.${camp.key}`] = [
          {
            required: true,
            message: 'Este campo es obligatorio.',
            trigger: camp.conCatalogo || camp.type === 'boolean' ? 'change' : 'blur',
          },
        ];
      });
    })
    .catch((err) => err);
}

// watch(
//   () => props.modelValue,
//   () => {
//     cleanDataCampos();
//     copyToDataCampos(props.modelValue);
//   },
// );

watch(
  () => ({ ...dataCampos }),
  () => {
    emit('update:modelValue', { ...dataCampos });
  },
);

initComponent();
watch(
  () => props.tipoDocumentoId,
  (current) => {
    if (current) {
      cleanDataCampos();
      initComponent();
    } else {
      campos.value = [];
    }
  },
);
defineExpose({
  copyToDataCampos,
});
</script>

<script lang="ts">
export default {
  name: 'DocumentoCamposForm',
};
</script>

<style lang="scss" scoped>
.grid-custom {
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-columns: auto;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
}
</style>
