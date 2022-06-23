<template>
  <div>
    <el-drawer v-model="showDrawer" :title="`${selected ? 'EDITAR' : 'AGREGAR'} CAMPO`" size="30rem" direction="rtl">
      <CampoForm ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">CAMPOS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar campo</el-button>
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
          prop="label"
          label="Nombre del campo"
          min-width="200px"
          fixed
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="label">
              <template #header>
                <filter-input v-model="where.label" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="nombre de campo"
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
          prop="dataType"
          label="Tipo de campo"
          min-width="200px"
          fixed
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="type">
              <template #header>
                <filter-input v-model="where.type" operator="like" options="i">
                  <template #default="props">
                    <SelectType v-model="props.filter.value" @keydown.enter="getLista" />
                  </template>
                </filter-input>
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="conCatalogo"
          label="Catalogo"
          min-width="200px"
          fixed
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="tipoCatalogo">
              <template #header>
                <filter-input v-model="where.tipoCatalogo" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Catalogo"
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
          prop="required"
          label="Es obligatorio"
          min-width="200px"
          fixed
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="required">
              <template #header>
                <filter-input v-model="where.required" operator="like" options="i">
                  <template #default="props">
                    <el-select
                      v-model="props.filter.value"
                      value-key="value"
                      placeholder="Todos"
                      clearable
                      @change="getLista"
                    >
                      <el-option
                        v-for="item in [
                          { value: true, label: 'OBLIGATORIO' },
                          { value: false, label: 'OPCIONAL' },
                        ]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </filter-input>
              </template>
              <template #default>
                <div class="text-center">
                  <el-tag :type="scope.row.required ? 'warning' : 'info'" size="normal" effect="dark">{{
                    scope.row.required ? 'REQUERIDO' : 'OPCIONAL'
                  }}</el-tag>
                </div>
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
import { ComodinObject } from '@/types';
import CampoForm from '@/views/campos/campo.form.vue';

export default {
  name: 'CamposPage',
  components: { CampoForm },
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
    } = useResourceComposable('campos');
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
