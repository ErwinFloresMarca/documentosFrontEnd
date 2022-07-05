<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12" :offset="0">
        <el-upload
          class="el-upload-custom"
          drag
          :action="fileApi.createUrl()"
          :limit="1"
          accept="image/*,.pdf"
          :on-exceed="handleExceed"
          :on-success="handleFileSuccess"
        >
          <el-icon style="font-size: 1rem"><upload-filled /></el-icon>
          <div class="el-upload__text">Suelte el archivo aquí <em>click para subir archivo</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png/pdf archivos con un tamaño menor a 3mb</div>
          </template>
        </el-upload>
        <div v-if="dataCarta.fileId">
          <el-image
            v-if="file?.mimeType.includes('image')"
            :src="fileApi.downloadUrlById(dataCarta.fileId)"
            fit="contain"
            style="width: 100%; height: 100%"
          />
          <iframe v-else :src="base64File" frameborder="0" width="100%" height="100%" />
        </div>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-form
          ref="formCarta"
          :model="dataCarta"
          :rules="cartaRules"
          :inline="false"
          size="normal"
          label-position="top"
        >
          <el-space fill style="width: 100%">
            <el-row :gutter="10" style="width: 100%">
              <el-col :span="12" :offset="0">
                <el-form-item label="Tipo de carta" prop="tipoCartasId">
                  <select-tipo-carta v-model="dataCarta.tipoCartasId" placeholder="tipo de carta" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-form-item label="Fecha de recepción" prop="fechaRecepcion">
                  <el-date-picker
                    v-model="dataCarta.fechaRecepcion"
                    type="datetime"
                    style="width: 100%"
                    placeholder="fecha y hora de recepción"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-space>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { Carta, IFile } from '@/api/types';
import useFileApi from '@/api/modules/file';

const fileApi = useFileApi();
const formCarta = ref(undefined);
const dataCarta = ref<Partial<Carta>>({});
const cartaRules = ref([]);
const file = ref<IFile | undefined>(undefined);
const base64File = ref<string | undefined>(undefined);

const handleExceed = () => {
  console.log('archivos exedidos');
};

const handleFileSuccess = async (resp: { files: IFile[] }) => {
  file.value = { ...resp.files[0] };
  dataCarta.value.fileId = resp.files[0].id;
  const respBs64: any = await fileApi.getBase64ById(file.value.id);
  base64File.value = `data:${file.value.mimeType};base64,${respBs64.data.base64}`;
};
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
</style>
