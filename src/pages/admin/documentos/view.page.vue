<template>
  <div v-if="documento">
    <el-drawer
      v-model="showDocumento"
      title="DOCUMENTO"
      direction="rtl"
      size="100%"
      :show-close="true"
      :wrapper-closable="true"
    >
      <div v-if="documento.fileId" class="w-full h-full">
        <el-image
          v-if="documento?.file?.mimeType.includes('image')"
          :src="fileApi.downloadUrlById(documento.fileId)"
          fit="contain"
          style="width: 100%; height: 100%"
        />
        <iframe v-else :src="base64File" frameborder="0" width="100%" height="100%" />
      </div>
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="flex flex-wrap justify-between">
          <span>DETALLE DE DOCUMENTO</span>
          <el-button type="primary" size="default" :icon="ArrowLeftBold" @click="$router.go(-1)">Atrás</el-button>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="24" :sm="12" :offset="0">
          <el-descriptions class="margin-top" title="DOCUMENTO" :column="2" size="small" border>
            <template #extra>
              <el-button
                v-if="documento?.fileId"
                :icon="PhFileArrowDown"
                type="primary"
                plain
                @click="showDocumento = true"
                >Ver archivo</el-button
              >
            </template>
            <el-descriptions-item label="NUMERO DE DOCUMENTO"> {{ documento?.numDoc }} </el-descriptions-item>
            <el-descriptions-item label="FECHA DE RECEPCIÓN"> {{ documento?.fechaRecepcion }} </el-descriptions-item>
            <el-descriptions-item label="TIPO DE DOCUMENTO">
              {{ documento?.tipoDocumento?.nombre }}
            </el-descriptions-item>
            <!-- campos -->
            <el-descriptions-item v-for="campo in campos" :key="campo.id" :label="campo.nombre">
              {{ documento?.campos[campo.key] }}
            </el-descriptions-item>
            <!-- campletar documento -->
            <el-descriptions-item v-if="documento?.ultimoEvento" label="ESTADO DEL DOCUMENTO">
              <el-tag effect="dark" :color="documento.ultimoEvento.color">{{
                documento?.ultimoEvento?.tipoEvento
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              v-if="documento?.tipoUltimoEvento !== DocumentoEventoTipos.culminado.tipo && auth.isTecnico()"
              label="EVENTO"
            >
              <el-button :loading="loading" :icon="PhFlag" size="medium" type="success" plain @click="onCompletDocument"
                >CULMINAR</el-button
              >
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="24" :sm="12" :offset="0">
          <h3>EVENTOS</h3>
          <el-timeline>
            <el-timeline-item
              v-for="evento in documento?.documentoEventos"
              :key="evento.id"
              :timestamp="$luxonDateTime.fromISO(evento.createdAt).toFormat('yyyy/LL/dd HH:mm:ss')"
              placement="top"
            >
              <el-card>
                <h4>
                  <el-tag size="medium" :color="evento.color" effect="dark">{{ evento.tipoEvento }}</el-tag>
                </h4>
                <strong>Responsable:</strong>
                <show-user :usuario="evento.ejecutor" />
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue';
import useDocumentoEventoResourceApi from '@/api/modules/documento-evento';
import useResourceApi from '@/api/resource';
import { Campo, Documento } from '@/api/types';
import useAuth from '@/store/auth';
import DocumentoEventoTipos, { ITipoEvento } from '@/utils/documento-eventos';
import PhFlag from '~icons/ph/flag';
import PhFileArrowDown from '~icons/ph/file-arrow-down';
import useFileApi from '@/api/modules/file';

const route = useRoute();
const router = useRouter();
const documento = ref<Documento | undefined>();
const docRsrce = useResourceApi('documentos');
const deRsrc = useDocumentoEventoResourceApi();
const auth = useAuth();
const loading = ref(false);
const fileApi = useFileApi();
const base64File = ref<string | undefined>(undefined);
const showDocumento = ref(false);

const downloadFileBase64 = async () => {
  if (documento.value?.file) {
    const respBs64: { data: { base64: string } } = await fileApi.getBase64ById(documento.value.file.id);
    base64File.value = `data:${documento.value.file?.mimeType};base64,${respBs64.data.base64}`;
  }
};

async function createEventDocument(tipoEvento: ITipoEvento) {
  if (documento.value && auth.user) {
    loading.value = true;
    await deRsrc
      .create({
        color: tipoEvento.color,
        tipoEvento: tipoEvento.tipo,
        documentoId: documento.value?.id,
        ejecutor: auth.user,
      })
      .then(() => {
        initComponent();
      })
      .catch(() => {
        ElMessage({
          message: 'Error al crear evento',
          type: 'error',
          duration: 3000,
        });
      });
    loading.value = false;
  }
}

async function initComponent() {
  if (route.params.id) {
    loading.value = true;
    await docRsrce
      .getById(parseInt(route.params.id.toString(), 10), {
        filter: {
          include: [
            {
              relation: 'tipoDocumento',
              scope: {
                include: [{ relation: 'campos' }],
              },
            },
            { relation: 'ultimoEvento' },
            { relation: 'file' },
            { relation: 'documentoEventos' },
          ],
        },
      })
      .then(({ data }: { data: Documento }) => {
        documento.value = data;
        if (documento.value?.tipoUltimoEvento === DocumentoEventoTipos.designado.tipo && auth.isTecnico()) {
          createEventDocument(DocumentoEventoTipos.pendiente);
        }
        if (!base64File.value) {
          downloadFileBase64();
        }
      })
      .catch((err) => {
        ElMessage({
          message: 'Error al recuperar la información',
          type: 'error',
          duration: '3000',
        });
        router.go(-1);
      });
    loading.value = false;
  } else {
    router.go(-1);
  }
}
initComponent();
const campos = computed<Campo[]>({
  get: () => documento.value?.tipoDocumento?.campos || [],
  set: (val) => val,
});
const onCompletDocument = () => {
  createEventDocument(DocumentoEventoTipos.culminado);
};
</script>

<script lang="ts">
export default {
  name: 'ViewDocumentoPage',
};
</script>

<style lang="scss" scoped></style>
