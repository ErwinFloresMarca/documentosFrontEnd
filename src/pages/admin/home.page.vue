<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="flex flex-wrap justify-between">
          <strong>{{ area ? (tipoDocumento ? 'DOCUMENTOS' : 'TIPOS DE DOCUMENTO') : 'AREAS' }}</strong>
          <div class="flex flx-wrap">
            <div class="flex flx-wrap items-center w-fit bread-class" @click="onClickAreas">
              <el-icon>
                <PhHouseLine />
              </el-icon>
              <strong class="ml-1">Areas</strong>
            </div>
            <div v-if="area" class="flex flx-wrap items-center w-fit bread-class" @click="onClickArea">
              <el-icon class="ml-2 mr-2">
                <ArrowRightBold />
              </el-icon>
              <el-icon>
                <PhBuildings />
              </el-icon>
              <strong class="ml-1">{{ area.nombre }}</strong>
            </div>
            <div v-if="tipoDocumento" class="flex flx-wrap items-center w-fit bread-class">
              <el-icon class="ml-2 mr-2">
                <ArrowRightBold />
              </el-icon>
              <el-icon>
                <PhFileText />
              </el-icon>
              <strong class="ml-1">{{ tipoDocumento.nombre }}</strong>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!(!changeArea && !area)">
        <div v-if="!area">
          <AdminListAreas @on-select-one="onSelectArea" />
        </div>
        <div v-else-if="!tipoDocumento">
          <AdminListTipoDocumentos :area="area" @on-select-one="onSelectTipoDocumento" />
        </div>
        <div v-else>
          <el-row :gutter="20">
            <el-col class="mb-2" :span="12" :sm="6" :offset="0">
              <CardArea :area="area" />
            </el-col>
            <el-col class="mb-2" :span="12" :sm="6" :offset="0">
              <ShowUser :usuario="auth.user" />
            </el-col>
            <el-col class="mb-2" :span="12" :sm="6" :offset="0">
              <CardTipoDocumento :tipo-documento="tipoDocumento" :area="area" />
            </el-col>
            <el-col class="mb-2" :span="12" :sm="6" :offset="0"
              ><div class="flex flex-wrap justify-end align-end">
                <DocReport :area-id="area.id" :tipo-documentos-id="tipoDocumento.id" /></div
            ></el-col>
            <el-col class="mb-2" :span="24" :offset="0">
              <DocumentosTable :area="area" :tipo-documento="tipoDocumento" />
            </el-col>
          </el-row>
        </div>
      </template>
      <div v-else class="w-full flex flex-wrap justify-center">
        <span>NO CUENTA CON UNA AREA ASIGNADA</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue';
import PhBuildings from '~icons/ph/buildings';
import PhHouseLine from '~icons/ph/house-line';
import PhFileText from '~icons/ph/file-text';
import { Area, TipoDocumento } from '@/api/types';
import AdminListAreas from '@/views/areas/admin-list-areas.vue';
import AdminListTipoDocumentos from '../../views/tipo-documentos/admin-list-tipo-documentos.vue';
import CardArea from '@/views/areas/components/card-area.vue';
import useAuth from '@/store/auth';
import CardTipoDocumento from '@/views/tipo-documentos/components/card-tipo-documento.vue';
import DocumentosTable from '@/views/documentos/documentos-table.vue';
import DocReport from '@/views/documentos/doc-report.vue';

const area = ref<Area | undefined>(undefined);
const tipoDocumento = ref<TipoDocumento | undefined>(undefined);
const auth = useAuth();
const changeArea = ref<boolean>(true);
if (auth.isTecnico()) {
  area.value = auth.area;
  changeArea.value = false;
}
function onSelectArea(a: Area) {
  if (changeArea.value) area.value = a;
}
function onSelectTipoDocumento(td: TipoDocumento) {
  tipoDocumento.value = td;
}

function onClickArea() {
  tipoDocumento.value = undefined;
}

function onClickAreas() {
  if (changeArea.value) {
    tipoDocumento.value = undefined;
    area.value = undefined;
  }
}
</script>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped>
.bread-class {
  cursor: pointer;
}
</style>
