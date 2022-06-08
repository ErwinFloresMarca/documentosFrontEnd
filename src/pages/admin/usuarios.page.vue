<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span>USUARIOS</span>
          <el-button type="primary" size="default" :icon="Plus">Agregar usuario</el-button>
        </div>
      </template>
      <el-table v-loading="loading" :data="lista" border stripe fit>
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column header-align="center" label="OPCIONES" width="110px" fixed>
          <template #default>
            <div class="flex flex-wrap justify-around" style="width: 100%">
              <el-tooltip effect="dark" content="Editar usuario" placement="bottom">
                <el-button type="info" size="mini" :icon="Edit" circle></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="Cambiar contraseña" placement="bottom">
                <el-button class="m-0" type="warning" size="mini" :icon="Lock" circle></el-button>
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
        <el-table-column header-align="center" align="center" prop="rol" label="ROL" min-width="80px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="estado" label="ESTADO" min-width="80px">
        </el-table-column>
      </el-table>
      <div class="flex flex-wrap justify-end" style="width: 100%">
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

export default {
  name: 'UsuariosPage',
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
