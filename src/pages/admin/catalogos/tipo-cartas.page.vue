<template>
  <div>
    <el-drawer
      v-model="showDrawer"
      :title="`${selected ? 'EDITAR' : 'AGREGAR'} TIPO DE CARTA`"
      size="30rem"
      direction="rtl"
    >
      <tipo-carta-form ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">TIPOS DE CARTAS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar tipo de carta</el-button>
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
          prop="updatedAt"
          label="Fecha actualización"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="updatedAt">
              <template #header>
                <filter-input v-model="where.updatedAt" operator="between">
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
                {{ $luxonDateTime.fromISO(scope.row.updatedAt).toRelative() }}
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="createdAt"
          label="Fecha creación"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="createdAt">
              <template #header>
                <filter-input v-model="where.createdAt" operator="between">
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
                {{ $luxonDateTime.fromISO(scope.row.createdAt).toRelative() }}
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

<script lang="ts">
import { Plus, Edit, Delete, RefreshRight } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import TipoCartaForm from '@/views/tipo-cartas/tipo-carta.form.vue';
import { ComodinObject } from '@/types';

export default {
  name: 'TipoCartasPage',
  components: { TipoCartaForm },
  setup() {
    const {
      lista,
      loading,
      pagination,
      where,
      include,
      paginate,
      emptyFirst,
      onChangePage,
      onChangeLimit,
      onSort,
      getLista,
      create,
      update,
      remove,
    } = useResourceComposable('tipo-cartas');
    include.value = undefined;
    emptyFirst.value = true;
    getLista();
    // from tipo de cartas
    const showDrawer = ref(false);
    const selected = ref<ComodinObject | undefined>(undefined);
    const errors = ref<object>({});
    const formRef = ref<ComodinObject | undefined>(undefined);
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
    const onEdit = (tipoCarta: object) => {
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
    const onDelete = (id) => {
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
    return {
      onSorter,
      // table
      loading,
      lista,
      pagination,
      where,
      include,
      paginate,
      onChangePage,
      onChangeLimit,
      onSort,
      getLista,
      create,
      update,
      Plus,
      Edit,
      Delete,
      RefreshRight,
      // from tipo de cartas
      formRef,
      showDrawer,
      errors,
      selected,
      onDelete,
      onNew,
      onEdit,
      onSave,
      onCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
