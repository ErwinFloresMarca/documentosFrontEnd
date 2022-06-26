<template>
  <div>
    <CatalogoDialogForm
      ref="formRef"
      v-model:visible="showDrawer"
      v-model:errors="errors"
      header="NUEVO REGISTRO"
      :selected="selected"
      :default-tipo="tipoCatalogo"
      @save="onSave"
      @cancel="onCancel"
    />
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold uppercase">TIPO DE CATALOGO - {{ unCamelCase(tipoCatalogo || 'todos') }}</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar catalogo</el-button>
        </div>
      </template>
      <el-table v-loading="loading" :data="lista" border stripe fit @sort-change="onSorter">
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column header-align="center" label="OPCIONES" width="99px" fixed>
          <template #default="scope">
            <custom-column-header :scope="scope">
              <template #header>
                <el-button type="primary" :icon="RefreshRight" size="small" circle @click="getLista"></el-button>
              </template>
              <div class="flex flex-wrap justify-around" style="width: 100%">
                <el-tooltip effect="dark" content="Editar tipo de carta" placement="bottom">
                  <el-button type="warning" size="small" :icon="Edit" plain @click="onEdit(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Eliminar tipo de carta" placement="bottom">
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
        <el-table-column header-align="center" prop="nombre" label="Nombre" min-width="200px" fixed sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="nombre">
              <template #header>
                <filter-input v-model="where.nombre" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="nombre"
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
          prop="tipo"
          label="Tipo"
          min-width="200px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="tipo">
              <template #header>
                <filter-input v-model="where.tipo" operator="inq">
                  <template #default="props">
                    <select-campo
                      v-if="!tipoCatalogo"
                      v-model="props.filter.value"
                      multiple
                      placeholder="tipos"
                      option-label="tipoCatalogo"
                      option-value="tipoCatalogo"
                      :default-where="defaultWhereTipos"
                      style="width: 100%"
                      @on-change="getLista"
                    />
                  </template>
                </filter-input>
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
import { Plus, Edit, Delete, RefreshRight } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import { ComodinObject } from '@/types';
import CatalogoDialogForm from '@/views/catalogos/catalogo-dialog-form.vue';
import { Catalogo, ICatalogo } from '@/api/types';
import { unCamelCase } from '@/utils/format';

const route = useRoute();
const tipoCatalogo: string | undefined =
  (Array.isArray(route.query.tipo) ? route.query.tipo[0] : route.query.tipo) || undefined;
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
  create,
  update,
  remove,
} = useResourceComposable('catalogos');
where.value.tipo = tipoCatalogo;
pagination.value.limit = 10;
include.value = undefined;
emptyFirst.value = true;
getLista();
// from tipo de cartas
const showDrawer = ref(false);
const selected = ref<Catalogo | undefined>(undefined);
const errors = ref<object>({});
const formRef = ref<any>(undefined);
const onNew = () => {
  errors.value = {};
  selected.value = undefined;
  showDrawer.value = true;
};
const cleanForm = () => {
  errors.value = {};
  if (formRef.value) formRef.value.resetValues();
};
const onSave = (data: { [key: string]: string | undefined }) => {
  if (!selected.value) {
    create({ ...data, passwordConfirm: undefined })
      .then((resp) => {
        if (resp !== false) {
          ElNotification({
            title: 'Exito!',
            message: 'Tipo de carta creada.',
            type: 'success',
            duration: 3000,
          });
          cleanForm();
          showDrawer.value = false;
          getLista();
          selected.value = undefined;
        }
      })
      .catch((err) => err);
  } else {
    const UpData = { ...data };
    Object.keys(UpData).forEach((k) => {
      UpData[k] = UpData[k] === null ? undefined : UpData[k];
    });
    update(selected.value.id, { ...UpData, passwordConfirm: undefined })
      .then((resp) => {
        if (resp !== false) {
          ElNotification({
            title: 'Exito!',
            message: 'Tipo e carta actualizada.',
            type: 'success',
            duration: 3000,
          });
          cleanForm();
          showDrawer.value = false;
          getLista();
          selected.value = undefined;
        }
      })
      .catch((err) => err);
  }
};
const onEdit = (tipoCarta: ICatalogo) => {
  selected.value = tipoCarta;
  showDrawer.value = true;
};
const onCancel = () => {
  cleanForm();
  selected.value = undefined;
  showDrawer.value = false;
};
const onSorter = (val: ComodinObject) => {
  if (val.prop) onSort(`${val.prop} ${val.order.includes('ascen') ? 'asc' : 'desc'}`);
  else onSort('');
};
const onDelete = (id: number) => {
  ElMessageBox.confirm('Está seguro de eliminar esta tipo de carta?', 'Advertencia!', {
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
const defaultWhereTipos = computed({
  get: () => ({
    conCatalogo: { eq: true },
  }),
  set: (value) => value,
});
</script>
<script lang="ts">
export default {
  name: 'ListCatalogosPage',
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
