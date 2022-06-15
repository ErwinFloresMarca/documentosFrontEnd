<template>
  <div>
    <el-drawer v-model="showDrawer" title="AGREGAR AREA" size="30rem" direction="rtl">
      <area-form ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">AREAS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar area</el-button>
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
                <el-tooltip effect="dark" content="Editar area" placement="bottom">
                  <el-button type="info" size="small" :icon="Edit" plain @click="onEdit(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Cambiar contraseña" placement="bottom">
                  <el-button
                    class="m-0"
                    type="warning"
                    size="small"
                    :icon="Lock"
                    plain
                    @click="onChangePassword(scope.row.id)"
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
          prop="updatedAt"
          label="Fecha actulizacion"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="updatedAt">
              <template #header>
                <filter-input v-model="where.updatedAt" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Fecha"
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
          prop="createdAt"
          label="Fecha creación"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="createdAt">
              <template #header>
                <filter-input v-model="where.createdAt" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Fechade creacion"
                      clearable
                      @keydown.enter="getLista"
                    ></el-input>
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

<script lang="ts">
import { Plus, Edit, Lock, RefreshRight } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import AreaForm from '@/views/areas/area.form.vue';
import { ComodinObject } from '@/types';

export default {
  name: 'AreasPage',
  components: { AreaForm },
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
    } = useResourceComposable('areas');
    emptyFirst.value = true;
    getLista();
    const onToggleEstado = (id: number, estado: boolean) => {
      update(id, { estado: !estado })
        .then(() => {
          ElNotification({
            title: 'Exito!',
            message: 'Usuario actualizado.',
            type: 'success',
            duration: 3000,
          });
          getLista();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // from areas
    const showDrawer = ref(false);
    const selected = ref<ComodinObject | undefined>(undefined);
    const errors = ref<object>({});
    const formRef = ref<ComodinObject | undefined>(undefined);
    const onNew = () => {
      errors.value = {};
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
                message: 'Area creada.',
                type: 'success',
                duration: 3000,
              });
              cleanForm();
              showDrawer.value = false;
              getLista();
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
                message: 'Area actualizada.',
                type: 'success',
                duration: 3000,
              });
              cleanForm();
              showDrawer.value = false;
              getLista();
            }
          })
          .catch((err) => err);
      }
    };
    const onEdit = (area: object) => {
      selected.value = area;
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
      Lock,
      RefreshRight,
      onToggleEstado,
      // from areas
      formRef,
      showDrawer,
      errors,
      selected,
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
