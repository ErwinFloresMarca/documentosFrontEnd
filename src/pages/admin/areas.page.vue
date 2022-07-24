<template>
  <div>
    <el-drawer v-model="showDrawer" title="AGREGAR AREA" size="30rem" direction="rtl" @close="onCancel">
      <area-form ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <area-tipo-documento-dialog v-model="showDialog" :area="selected" @close="onCloseDialog" />
    <nuevo-responsable-area-dialog
      v-model="showDialogResponsable"
      :area="areaResponsable"
      @close="onCancelResponsable"
      @save="onSuccesSaveResponsable"
    />
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">AREAS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar area</el-button>
        </div>
      </template>
      <el-table v-loading="loading" :data="lista" border stripe fit @sort-change="onSorter">
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column header-align="center" label="OPCIONES" width="150px" fixed>
          <template #default="scope">
            <custom-column-header :scope="scope">
              <template #header>
                <el-button type="primary" :icon="RefreshRight" size="small" circle @click="getLista"></el-button>
              </template>
              <div class="flex flex-wrap justify-around" style="width: 100%">
                <el-tooltip effect="dark" content="Asignar tipos de documentos" placement="bottom">
                  <el-button
                    type="primary"
                    size="small"
                    :icon="DocumentCopy"
                    plain
                    @click="onClickTipoDocumentos(scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Editar area" placement="bottom">
                  <el-button type="warning" size="small" :icon="Edit" plain @click="onEdit(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Eliminar area" placement="bottom">
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
        <el-table-column header-align="center" label="responsable" min-width="200px" align="center" sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="nombre">
              <template #default>
                <div class="flex justify-center">
                  <show-user :usuario="scope.row.responsables ? scope.row.responsables[0].usuario : undefined">
                    <template #empty>
                      <div>
                        <el-button
                          type="warning"
                          :icon="PhUserCirclePlus"
                          size="default"
                          plain
                          @click="onAsignarResponsableArea(scope.row)"
                          >Asignar Responsable</el-button
                        >
                      </div>
                    </template>
                    <template #options>
                      <el-tooltip content="Dar de baja a responsable" placement="top" effect="dark">
                        <el-button
                          :loading="loadingResp"
                          type="danger"
                          size="default"
                          :icon="PhUserCircleMinus"
                          plain
                          circle
                          @click="darDeBaja(scope.row.responsables[0].id)"
                        />
                      </el-tooltip>
                    </template>
                  </show-user>
                </div>
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="updatedAt"
          label="Fecha actualización"
          min-width="210px"
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
          min-width="200px"
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
import { Plus, Edit, Delete, RefreshRight, DocumentCopy } from '@element-plus/icons-vue';
import useResourceComposable from '@/composables/resource.composable';
import AreaForm from '@/views/areas/area.form.vue';
import { ComodinObject } from '@/types';
import { Area } from '@/api/types';
import AreaTipoDocumentoDialog from '../../views/areas/area-tipo-documento.dialog.vue';
import PhUserCirclePlus from '~icons/ph/user-circle-plus';
import PhUserCircleMinus from '~icons/ph/user-circle-minus';
import NuevoResponsableAreaDialog from '@/views/areas/nuevo-responsable-area-dialog.vue';
import useResourceApi from '@/api/resource';

export default {
  name: 'AreasPage',
  components: { AreaForm, AreaTipoDocumentoDialog, NuevoResponsableAreaDialog },
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
    } = useResourceComposable('areas');
    include.value = [
      {
        relation: 'responsables',
        scope: {
          where: {
            estado: true,
          },
          include: [
            {
              relation: 'usuario',
            },
          ],
        },
      },
    ];
    emptyFirst.value = true;
    getLista();
    // from areas
    const showDrawer = ref(false);
    const selected = ref<Area | undefined>(undefined);
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
              // eslint-disable-next-line no-undef
              ElNotification({
                title: 'Exito!',
                message: 'Area creada.',
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
              // eslint-disable-next-line no-undef
              ElNotification({
                title: 'Exito!',
                message: 'Area actualizada.',
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
    const onEdit = (area: Area) => {
      selected.value = area;
      showDrawer.value = true;
    };
    const onCancel = () => {
      selected.value = undefined;
      showDrawer.value = false;
      cleanForm();
    };
    const onSorter = (val: ComodinObject) => {
      if (val.prop) onSort(`${val.prop} ${val.order.includes('ascen') ? 'asc' : 'desc'}`);
      else onSort('');
    };
    const onDelete = (id: number) => {
      ElMessageBox.confirm('Está seguro de eliminar esta area?', 'Advertencia!', {
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
      })
        .then(() => {
          remove(id, true)
            .then(() => {
              ElMessage({
                type: 'success',
                message: 'Delete completed',
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
    // asignar tipos de documentos
    const showDialog = ref(false);
    const onCloseDialog = () => {
      selected.value = undefined;
      showDialog.value = false;
    };
    const onClickTipoDocumentos = (area: Area) => {
      selected.value = area;
      showDialog.value = true;
    };
    // responsable area
    const areaResponsable = ref<Area | undefined>(undefined);
    const showDialogResponsable = ref(false);
    const onAsignarResponsableArea = (area: Area) => {
      areaResponsable.value = { ...area };
      showDialogResponsable.value = true;
    };
    const onCancelResponsable = () => {
      areaResponsable.value = undefined;
      showDialogResponsable.value = false;
    };
    const onSuccesSaveResponsable = () => {
      areaResponsable.value = undefined;
      showDialogResponsable.value = false;
      getLista();
    };
    const responsableResource = useResourceApi('responsables');
    const loadingResp = ref(false);
    const darDeBaja = (respId: number) => {
      loadingResp.value = true;
      responsableResource
        .update(respId, {
          estado: false,
        })
        .then(() => {
          loadingResp.value = false;
          ElMessage({
            type: 'warning',
            message: 'Responsable dado de baja',
            duration: 3000,
          });
          getLista();
        })
        .catch((err) => err);
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
      // from areas
      formRef,
      showDrawer,
      errors,
      selected,
      onDelete,
      onNew,
      onEdit,
      onSave,
      onCancel,
      // asignar Tipos de documentos dialog
      showDialog,
      onCloseDialog,
      onClickTipoDocumentos,
      DocumentCopy,
      // asignar responsable
      loadingResp,
      PhUserCircleMinus,
      areaResponsable,
      PhUserCirclePlus,
      showDialogResponsable,
      onCancelResponsable,
      onAsignarResponsableArea,
      onSuccesSaveResponsable,
      darDeBaja,
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
