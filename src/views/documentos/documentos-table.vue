<template>
  <div class="w-full">
    <el-table v-loading="loading" :data="lista" border stripe fit @sort-change="onSorter">
      <el-table-column header-align="center" label="OPCIONES" width="99px" fixed>
        <template #default="scope">
          <custom-column-header :scope="scope">
            <template #header>
              <el-button type="primary" :icon="RefreshRight" size="small" circle @click="getLista"></el-button>
            </template>
            <div class="flex flex-wrap justify-around" style="width: 100%">
              <el-tooltip effect="dark" content="Ver documento" placement="bottom">
                <el-button
                  type="primary"
                  size="small"
                  :icon="PhCornersOut"
                  plain
                  @click="onViewDoc(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="isTecnico() && scope.row.tipoUltimoEvento !== DocumentoEventoTipos.culminado.tipo"
                effect="dark"
                content="Marcar como completado"
                placement="bottom"
              >
                <el-button
                  class="m-0"
                  type="success"
                  size="small"
                  :icon="PhFlag"
                  plain
                  @click="onCompleteDoc(scope.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </custom-column-header>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="numDoc"
        label="NÚMERO DOCUMENTO"
        min-width="210px"
        fixed
        sortable="custom"
      >
        <template #default="scope">
          <custom-column-header :scope="scope" prop="numDoc">
            <template #header>
              <filter-input v-model="where.numDoc" operator="like" options="i">
                <template #default="props">
                  <el-input
                    v-model="props.filter.value"
                    placeholder="numDoc"
                    clearable
                    @keydown.enter="getLista"
                  ></el-input>
                </template>
              </filter-input>
            </template>
          </custom-column-header>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="fechaRecepcion"
        label="FECHA DE RECEPCION"
        min-width="200px"
        sortable="custom"
      >
        <template #default="scope">
          <custom-column-header :scope="scope" prop="fechaRecepcion">
            <template #header>
              <filter-input v-model="where.fechaRecepcion" operator="between">
                <template #default="props">
                  <el-date-picker
                    v-model="props.filter.value"
                    type="daterange"
                    range-separator="A"
                    start-placeholder="fecha inicio"
                    end-placeholder="fecha fin"
                    @change="getLista"
                  />
                </template>
              </filter-input>
            </template>
            <template #default>
              {{ $luxonDateTime.fromISO(scope.row.fechaRecepcion).toRelative() }}
            </template>
          </custom-column-header>
        </template>
      </el-table-column>
      <el-table-column
        v-for="campo in campos"
        :key="campo.id"
        header-align="center"
        align="center"
        :prop="`campos.${campo.key}`"
        :label="campo.nombre"
        min-width="200px"
      >
        <template #default="scope">
          <custom-column-header :scope="scope" :prop="`campos.${campo.key}`">
            <template #header>
              <filter-input v-model="where[`campos.${campo.key}`]" operator="like" options="i">
                <template #default="props">
                  <el-input
                    v-model="props.filter.value"
                    :placeholder="campo.placeholder"
                    clearable
                    @keydown.enter="getLista"
                  ></el-input>
                </template>
              </filter-input>
            </template>
            <template #default>
              {{ scope.row.campos[campo.key] }}
            </template>
          </custom-column-header>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="tipoUltimoEvento"
        label="ESTADO"
        min-width="140px"
        sortable="custom"
      >
        <template #default="scope">
          <custom-column-header :scope="scope" prop="tipoUltimoEvento">
            <template #header>
              <filter-input v-model="where.tipoUltimoEvento" operator="like" options="i">
                <template #default="props">
                  <el-input
                    v-model="props.filter.value"
                    placeholder="estado"
                    clearable
                    @keydown.enter="getLista"
                  ></el-input>
                </template>
              </filter-input>
            </template>
            <template #default>
              <el-tag effect="dark" :color="scope.row.ultimoEvento.color">{{
                scope.row?.ultimoEvento?.tipoEvento
              }}</el-tag>
            </template>
          </custom-column-header>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-wrap justify-end mt-3" style="width: 100%">
      <el-pagination
        v-model:currentPage="pagination.page"
        v-model:page-size="pagination.limit"
        :page-sizes="[5, 10, 20, 30]"
        background
        layout="sizes, prev, pager, next, jumper, total"
        :total="pagination.total"
        @size-change="onChangeLimit"
        @current-change="onChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import { ComodinObject } from '@/types';
import PhCornersOut from '~icons/ph/corners-out';
import PhFlag from '~icons/ph/flag';
import useResourceComposable from '@/composables/resource.composable';
import { Area, Campo, Documento, TipoDocumento } from '@/api/types';
import useResourceApi from '@/api/resource';
import useAuth from '@/store/auth';
import router from '@/router';
import useDocumentoEventoResourceApi from '@/api/modules/documento-evento';
import DocumentoEventoTipos, { ITipoEvento } from '@/utils/documento-eventos';

const props = defineProps({
  area: {
    type: Object as PropType<Area>,
    required: true,
  },
  tipoDocumento: {
    type: Object as PropType<TipoDocumento>,
    required: true,
  },
});

const { isTecnico } = useAuth();

const { lista, loading, pagination, where, include, emptyFirst, onChangePage, onChangeLimit, onSort, getLista } =
  useResourceComposable<Documento>(`areas/${props.area.id}/documentos`);
include.value = ['tipoDocumento', 'ultimoEvento'];
emptyFirst.value = true;
where.value = { tipoDocumentosId: props.tipoDocumento.id };
getLista();
// campos  typo documento
const campos = ref<Campo[]>([]);
const tdcRsrc = useResourceApi(`tipo-documentos/${props.tipoDocumento.id}/campos`);
function initComponent() {
  tdcRsrc.list().then(({ data }: { data: Array<Campo> }) => {
    if (data) campos.value = data;
  });
}

initComponent();

const onSorter = (val: ComodinObject) => {
  if (val.prop) onSort(`${val.prop} ${val.order.includes('ascen') ? 'asc' : 'desc'}`);
  else onSort('');
};

function onViewDoc(doc: Documento) {
  router.push({ name: 'ViewDocumento', params: { id: doc.id } });
}

const auth = useAuth();
const deRsrc = useDocumentoEventoResourceApi();

async function createEventDocument(tipoEvento: ITipoEvento, documento: Documento) {
  if (documento && auth.user) {
    loading.value = true;
    await deRsrc
      .create({
        color: tipoEvento.color,
        tipoEvento: tipoEvento.tipo,
        documentoId: documento.id,
        ejecutor: auth.user,
      })
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Documento marcado como completado.',
          duration: 3000,
        });
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
function onCompleteDoc(doc: Documento) {
  ElMessageBox.confirm('Está seguro de marcar como completado este documento?', 'Advertencia!', {
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
    .then(() => {
      createEventDocument(DocumentoEventoTipos.culminado, doc).then(() => {
        ElMessage({
          type: 'success',
          message: 'Documento culminado',
          duration: 3000,
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Cancelado',
      });
    });
}
</script>

<script lang="ts">
export default {
  name: 'DocumentosTable',
};
</script>

<style lang="scss" scoped></style>
