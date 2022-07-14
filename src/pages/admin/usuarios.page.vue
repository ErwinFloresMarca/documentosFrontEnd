<template>
  <div>
    <el-drawer v-model="showDrawer" title="AGREGAR USUARIO" size="30rem" direction="rtl" @close="onCancel">
      <usuario-form ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">USUARIOS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar usuario</el-button>
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
                <el-tooltip effect="dark" content="Editar usuario" placement="bottom">
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
        <el-table-column header-align="center" prop="ci" label="C.I." min-width="80px" fixed sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="ci">
              <template #header>
                <filter-input v-model="where.ci" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="ci"
                      clearable
                      @keydown.enter="getLista"
                    ></el-input>
                  </template>
                </filter-input>
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="usuario" label="USUARIO" min-width="140px" sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="usuario">
              <template #header>
                <filter-input v-model="where.usuario" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Nombres"
                      clearable
                      @keydown.enter="getLista"
                    ></el-input>
                  </template>
                </filter-input>
              </template>
              <template #default>
                <show-user :usuario="scope.row" />
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="nombres" label="NOMBRES" min-width="120px" sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="nombres">
              <template #header>
                <filter-input v-model="where.nombres" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Nombres"
                      clearable
                      @keydown.enter="getLista"
                    ></el-input>
                  </template>
                </filter-input>
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="paterno" label="A. PATERNO" min-width="140px" sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="paterno">
              <template #header>
                <filter-input v-model="where.paterno" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Ap. paterno"
                      clearable
                      @keydown.enter="getLista"
                    ></el-input>
                  </template>
                </filter-input>
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="materno" label="A. MATERNO" min-width="140px" sortable="custom">
          <template #default="scope">
            <custom-column-header :scope="scope" prop="materno">
              <template #header>
                <filter-input v-model="where.materno" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Ap. materno"
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
          prop="celular"
          label="CELULAR"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="celular">
              <template #header>
                <filter-input v-model="where.celular" operator="like" options="i">
                  <template #default="props">
                    <el-input
                      v-model="props.filter.value"
                      placeholder="Usuario"
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
          prop="rol"
          label="ROL"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="paterno">
              <template #header>
                <filter-input v-model="where.rol" operator="equals">
                  <template #default="props">
                    <select-rol v-model="props.filter.value" @change="getLista" />
                  </template>
                </filter-input>
              </template>
              <template #default>
                {{ scope.row.rol ? scope.row.rol.toUpperCase() : '' }}
              </template>
            </custom-column-header>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="estado"
          label="ESTADO"
          min-width="120px"
          sortable="custom"
        >
          <template #default="scope">
            <custom-column-header :scope="scope" prop="paterno">
              <template #header>
                <filter-input v-model="where.estado" operator="equals">
                  <template #default="props">
                    <el-select v-model="props.filter.value" placeholder="estado" clearable @change="getLista">
                      <el-option label="HABILITADO" :value="true">
                        <el-tag type="success">HABILITADO</el-tag>
                      </el-option>
                      <el-option label="INHABILITADO" :value="false">
                        <el-tag type="danger">INHABILITADO</el-tag>
                      </el-option>
                    </el-select>
                  </template>
                </filter-input>
              </template>
              <template #default>
                <el-button
                  :type="scope.row.estado ? 'success' : 'danger'"
                  size="small"
                  round
                  plain
                  @click="onToggleEstado(scope.row.id, scope.row.estado)"
                  >{{ scope.row.estado ? 'HABILITADO' : 'INHABILITADO' }}</el-button
                >
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
import useUsuariosComposable from '@/composables/usuarios.composable';
import UsuarioForm from '@/views/usuarios/usuario.form.vue';
import { ComodinObject } from '@/types';
import ShowUser from '../../components/ShowUser.vue';
import useAuth from '@/store/auth';

export default {
  name: 'UsuariosPage',
  components: { UsuarioForm, ShowUser },
  setup() {
    const auth = useAuth();
    const {
      lista,
      loading,
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
      changePassword,
    } = useUsuariosComposable();
    getLista();
    const onToggleEstado = (id: number, estado: boolean) => {
      update(id, { estado: !estado })
        .then(() => {
          // eslint-disable-next-line no-undef
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
    // from usuarios
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
              // eslint-disable-next-line no-undef
              ElNotification({
                title: 'Exito!',
                message: 'Usuario creado.',
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
              // eslint-disable-next-line no-undef
              ElNotification({
                title: 'Exito!',
                message: 'Usuario actualizado.',
                type: 'success',
                duration: 3000,
              });
              if (selected.value?.id === auth.user?.id) auth.refreshMe();
              cleanForm();
              showDrawer.value = false;
              getLista();
            }
          })
          .catch((err) => err);
      }
    };
    const onEdit = (usuario: object) => {
      selected.value = usuario;
      showDrawer.value = true;
    };
    const onChangePassword = (usuarioId: number) => {
      // eslint-disable-next-line no-undef
      ElMessageBox.prompt('Introduzca una nueva contraseña:  ', 'Cambiar contraseña', {
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        inputType: 'password',
        inputPattern: /^(?=.*).{8,}$/,
        inputErrorMessage: 'Contraseña muy corta',
      })
        .then(({ value }: { value: string }) => {
          changePassword(usuarioId, { password: value })
            .then((resp) => {
              if (resp !== false) {
                ElMessage({
                  type: 'success',
                  message: `La contraseña se cambio exitosamente.`,
                  duration: 3000,
                });
              }
            })
            .catch((err) => err);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Cancelado!.',
          });
        });
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
      changePassword,
      Plus,
      Edit,
      Lock,
      RefreshRight,
      onToggleEstado,
      // from usuarios
      formRef,
      showDrawer,
      errors,
      selected,
      onNew,
      onEdit,
      onChangePassword,
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
