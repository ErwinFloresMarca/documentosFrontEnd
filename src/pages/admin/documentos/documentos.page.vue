<template>
  <div>
    <el-dialog
      v-model="showDialogAssignAreas"
      title="ASIGNAR AREAS"
      width="min(600px, 100%)"
      @close="onCancelAssignAreas"
    >
      <asignar-areas :documento-id="documentoId" @save="onCancelAssignAreas" />
    </el-dialog>

    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold uppercase">DOCUMENTOS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar documento</el-button>
        </div>
      </template>
      <el-table v-loading="loading" :data="lista" border stripe fit @sort-change="onSorter">
        <el-table-column header-align="center" label="OPCIONES" width="99px" fixed>
          <template #default="scope">
            <custom-column-header :scope="scope">
              <template #header>
                <el-button type="primary" :icon="RefreshRight" size="small" circle @click="getLista"></el-button>
              </template>
              <div class="flex flex-wrap justify-around" style="width: 100%">
                <el-tooltip v-if="!scope.row.tipoUltimoEvento" effect="dark" content="Asignar areas" placement="bottom">
                  <el-button
                    type="success"
                    size="small"
                    :icon="PhBuildings"
                    plain
                    @click="onAssignAreas(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Eliminar tipo de documento" placement="bottom">
                  <el-button
                    class="m-0"
                    type="danger"
                    size="small"
                    :icon="Delete"
                    plain
                    @click="onDelete(scope.row.id)"
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
          min-width="200px"
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
          label="TIPO DE DOCUMENTO"
          min-width="200px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="tipoDocumentosId">
              <template #header>
                <filter-input v-model="where.tipoDocumentosId" operator="inq">
                  <template #default="props">
                    <select-tipo-documento
                      v-model="props.filter.value"
                      multiple
                      placeholder="TODOS"
                      :default-where="defaultWhereTipoDocumentos"
                      style="width: 100%"
                      @on-change="getLista"
                    />
                  </template>
                </filter-input>
              </template>
              <template #default>
                {{ scope.row.tipoDocumento.nombre }}
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
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { Plus, Delete, RefreshRight } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import AsignarAreas from '@/views/documentos/asignar-areas.vue';
import { ComodinObject } from '@/types';
import { Documento } from '@/api/types';
import PhBuildings from '~icons/ph/buildings';

const router = useRouter();

const {
  lista,
  loading,
  pagination,
  where,
  include,
  emptyFirst,
  onChangePage,
  onChangeLimit,
  onSort,
  getLista,
  remove,
} = useResourceComposable<Documento>('documentos');
include.value = ['tipoDocumento', 'ultimoEvento'];
emptyFirst.value = true;
getLista();
// from tipo de documentos
const onNew = () => {
  router.push({
    name: 'NuevaDocumento',
  });
};
// const onEdit = (tipoDocumento: IDocumento) => {
//   console.log('on edit documento');
// };
const onSorter = (val: ComodinObject) => {
  if (val.prop) onSort(`${val.prop} ${val.order.includes('ascen') ? 'asc' : 'desc'}`);
  else onSort('');
};
const onDelete = (id: number) => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('Está seguro de eliminar esta documento?', 'Advertencia!', {
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
    .then(() => {
      remove(id, true)
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Eliminación completada',
          });
        })
        .catch((err) => err);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      });
    });
};
const defaultWhereTipoDocumentos = computed({
  get: () => ({}),
  set: (value) => value,
});
// asignar areas
const showDialogAssignAreas = ref(false);
const documentoId = ref<number | undefined>();
const onAssignAreas = (dId: number) => {
  documentoId.value = dId;
  showDialogAssignAreas.value = true;
};
const onCancelAssignAreas = () => {
  documentoId.value = undefined;
  showDialogAssignAreas.value = false;
  getLista();
};
</script>
<script lang="ts">
export default {
  name: 'DocumentosPage',
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
