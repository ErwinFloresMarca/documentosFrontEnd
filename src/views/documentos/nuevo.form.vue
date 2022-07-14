<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12" :xs="24" :offset="0">
        <el-upload
          class="el-upload-custom"
          drag
          :action="fileApi.createUrl()"
          :limit="1"
          accept="image/*,.pdf"
          :on-exceed="handleExceed"
          :on-success="handleFileSuccess"
          :on-remove="handleRemove"
        >
          <el-icon style="font-size: 1rem"><upload-filled /></el-icon>
          <div class="el-upload__text">Suelte el archivo aquí <em>click para subir archivo</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png/pdf archivos con un tamaño menor a 3mb</div>
          </template>
        </el-upload>
        <div v-if="dataDocumento.fileId" style="height: 350px">
          <el-image
            v-if="file?.mimeType.includes('image')"
            :src="fileApi.downloadUrlById(dataDocumento.fileId)"
            fit="contain"
            style="width: 100%; height: 100%"
          />
          <iframe v-else :src="base64File" frameborder="0" width="100%" height="100%" />
        </div>
      </el-col>
      <el-col :span="12" :xs="24" :offset="0" style="height: fit-content">
        <el-scrollbar height="450px">
          <el-form
            ref="formDocumento"
            :model="dataDocumento"
            :rules="documentoRules"
            :inline="false"
            label-position="top"
          >
            <el-space fill style="width: 100%">
              <div class="grid grid-custom">
                <el-form-item label="Tipo de documento" prop="tipoDocumentosId">
                  <select-tipo-documento
                    v-model="dataDocumento.tipoDocumentosId"
                    placeholder="tipo de documento"
                    style="width: 100%"
                  />
                </el-form-item>
                <el-form-item label="Fecha de recepción" prop="fechaRecepcion">
                  <el-date-picker
                    v-model="dataDocumento.fechaRecepcion"
                    class="custom-date-picker"
                    type="datetime"
                    placeholder="fecha y hora de recepción"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="Solicitante" prop="solicitante">
                  <el-input v-model="dataDocumento.solicitante" placeholder="solicitante" clearable></el-input>
                </el-form-item>
              </div>
            </el-space>
            <documento-campos-form
              v-if="dataDocumento.tipoDocumentosId"
              v-model="dataDocumento.campos"
              v-model:rules="documentoRules"
              :tipo-documento-id="dataDocumento.tipoDocumentosId"
            />
          </el-form>
        </el-scrollbar>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-button style="width: 100%" type="primary" @click="onSave">GUARDAR</el-button>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-button style="width: 100%" type="danger" @click="emit('cancel')">CANCELAR</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { Documento, IFile } from '@/api/types';
import useFileApi from '@/api/modules/file';
import DocumentoCamposForm from './documento-campos.form.vue';
import useResourceApi from '@/api/resource';

const emit = defineEmits(['success', 'cancel']);
const fileApi = useFileApi();
const formDocumento = ref(undefined);
const dataDocumento = ref<Partial<Documento>>({});
const file = ref<IFile | undefined>(undefined);
const base64File = ref<string | undefined>(undefined);
const documentoRules = ref({
  tipoDocumentosId: [{ required: true, message: 'Este campo es requerido.', trigger: 'blur' }],
  fechaRecepcion: [{ required: true, message: 'Este campo es requerido.', trigger: 'blur' }],
});

const handleExceed = () => {
  console.log('archivos exedidos');
};

const handleFileSuccess = async (resp: { files: IFile[] }) => {
  file.value = { ...resp.files[0] };
  dataDocumento.value.fileId = resp.files[0].id;
  const respBs64: unknown = await fileApi.getBase64ById(file.value.id);
  base64File.value = `data:${file.value.mimeType};base64,${respBs64.data.base64}`;
};
const handleRemove = () => {
  dataDocumento.value.fileId = undefined;
};

const resetValues = () => {
  dataDocumento.value = {};
  if (formDocumento.value) {
    formDocumento.value?.resetFields(['nombre']);
  }
};
const documentoRsrc = useResourceApi('documentos');

function onSave() {
  if (!formDocumento.value) return;
  formDocumento.value.validate((valid: boolean) => {
    if (valid) {
      documentoRsrc
        .create(dataDocumento.value)
        .then(({ data }) => {
          if (data) {
            resetValues();
            emit('success', data);
          }
        })
        .catch((err) => err);
      return true;
    }
    return false;
  });
}
defineExpose({
  resetValues,
});
</script>
<script lang="ts">
export default {
  name: 'NuevoForm',
};
</script>

<style lang="scss" scoped>
::v-deep(div.el-upload-custom) {
  .is-drag {
    .el-upload-dragger {
      padding: 10px !important;
    }
  }
}

.grid-custom {
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-columns: auto;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
}
</style>
