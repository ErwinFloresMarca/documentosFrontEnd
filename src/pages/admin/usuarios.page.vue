<template>
  <div>
    <el-drawer v-model="showDrawer" title="AGREGAR USUARIO" size="30rem" direction="rtl">
      <usuario-form ref="formRef" v-model:errors="errors" :selected="selected" @save="onSave" @cancel="onCancel" />
    </el-drawer>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold">USUARIOS</span>
          <el-button type="primary" size="default" :icon="Plus" @click="onNew">Agregar usuario</el-button>
        </div>
      </template>
      <el-table v-loading="loading" :data="lista" border stripe fit>
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column header-align="center" label="OPCIONES" width="110px" fixed>
          <template #default>
            <div class="flex flex-wrap justify-around" style="width: 100%">
              <el-tooltip effect="dark" content="Editar usuario" placement="bottom">
                <el-button type="info" size="small" :icon="Edit" plain></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="Cambiar contraseña" placement="bottom">
                <el-button class="m-0" type="warning" size="small" :icon="Lock" plain></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="ci" label="C.I." min-width="100px" fixed> </el-table-column>
        <el-table-column header-align="center" prop="nombres" label="NOMBRES" min-width="120px"> </el-table-column>
        <el-table-column header-align="center" prop="paterno" label="A. PATERNO" min-width="100px"> </el-table-column>
        <el-table-column header-align="center" prop="materno" label="A. MATERNO" min-width="100px"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="celular" label="CELULAR" min-width="100px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="rol" label="ROL" min-width="120px">
          <template #default="{ row }">
            {{ row.rol.toUpperCase() }}
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="estado" label="ESTADO" min-width="120px">
          <template #default="{ row }">
            <el-button
              :type="row.estado ? 'success' : 'danger'"
              size="small"
              round
              plain
              @click="onToggleEstado(row.id, row.estado)"
              >{{ row.estado ? 'HABILITADO' : 'INHABILITADO' }}</el-button
            >
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
import { Plus, Edit, Lock } from '@element-plus/icons-vue';
import useUsuariosComposable from '@/composables/usuarios.composable';
import UsuarioForm from '@/views/usuarios/usuario.form.vue';

export default {
  name: 'UsuariosPage',
  components: { UsuarioForm },
  setup() {
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
          ElNotification({
            title: 'Exito!',
            message: 'Usuario actualizado.',
            type: 'success',
            duration: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // from usuarios
    const showDrawer = ref(false);
    const selected = ref<object | undefined>(undefined);
    const errors = ref<object>({});
    const formRef = ref<any>(undefined);
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
          .then(() => {
            ElNotification({
              title: 'Exito!',
              message: 'Usuario creado.',
              type: 'success',
              duration: 3000,
            });
            cleanForm();
            showDrawer.value = false;
            getLista();
          })
          .catch((err) => err);
      }
    };
    const onCancel = () => {
      cleanForm();
      showDrawer.value = false;
    };
    return {
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
      Plus,
      Edit,
      Lock,
      onToggleEstado,
      // from usuarios
      formRef,
      showDrawer,
      errors,
      selected,
      onNew,
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
